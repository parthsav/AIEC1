import json

from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from sse_starlette.sse import EventSourceResponse

from server.agent import run_agent, stream_agent_events, store

app = FastAPI(title="Codebase Concierge")

STATIC_DIR = "static"
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")


class ChatRequest(BaseModel):
    message: str
    conversation_id: str | None = None


@app.get("/")
async def index():
    return FileResponse(f"{STATIC_DIR}/index.html")


@app.post("/api/chat")
async def chat(req: ChatRequest):
    """Non-streaming chat endpoint. Kept for curl/CI verification and as
    a fallback; the browser UI uses /api/chat/stream for live progress.
    """
    conv = store.get_or_create(req.conversation_id)
    result = await run_agent(conv.id, req.message)
    return {"reply": result["reply"], "conversation_id": result["conversation_id"]}


@app.post("/api/chat/stream")
async def chat_stream(req: ChatRequest):
    """SSE endpoint: streams tool-use and text events as the agent works,
    then a final `result` event. Activity #1 option 1.
    """
    conv = store.get_or_create(req.conversation_id)

    async def event_generator():
        async for event in stream_agent_events(conv.id, req.message):
            yield {"event": event["type"], "data": json.dumps(event)}

    return EventSourceResponse(event_generator())


@app.get("/api/conversations")
async def list_conversations():
    return [
        {"id": c.id, "title": c.title, "message_count": len(c.messages)}
        for c in store.list()
    ]


@app.post("/api/conversations")
async def create_conversation():
    conv = store.create()
    return {"id": conv.id, "title": conv.title}


@app.get("/api/conversations/{conversation_id}")
async def get_conversation(conversation_id: str):
    conv = store._conversations.get(conversation_id)
    if conv is None:
        raise HTTPException(status_code=404, detail="conversation not found")
    return {"id": conv.id, "title": conv.title, "messages": conv.messages}


@app.delete("/api/conversations/{conversation_id}")
async def delete_conversation(conversation_id: str):
    store.delete(conversation_id)
    return {"ok": True}
