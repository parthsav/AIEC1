"""The codebase-concierge agent: wraps the Claude Agent SDK's query() loop,
keeps per-conversation session state, and yields structured events so the
transport layer (SSE or plain JSON) can render them however it likes.
"""

import os
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, AsyncIterator

from claude_agent_sdk import (
    AssistantMessage,
    ClaudeAgentOptions,
    ResultMessage,
    SystemMessage,
    TextBlock,
    ToolResultBlock,
    ToolUseBlock,
    query,
)

from server.tools import build_concierge_server

# Repo this concierge answers questions about. Defaults to the course repo
# this chat app itself lives in; override with TARGET_REPO_PATH for any
# other target.
_DEFAULT_TARGET_REPO = Path(__file__).resolve().parents[3]
TARGET_REPO_PATH = os.environ.get("TARGET_REPO_PATH", str(_DEFAULT_TARGET_REPO))

MAX_TURNS = 25

SYSTEM_PROMPT = f"""You are a codebase concierge for the repository at {TARGET_REPO_PATH}.
Answer questions about this repository concisely and accurately.
Always cite file paths (relative to the repo root) for any claim you make about the code.
Use count_lines to report line counts instead of guessing, and git_log to answer
questions about recent history or changes.
If a question can't be answered from this repository, say so plainly instead of guessing."""

_concierge_server = build_concierge_server()

# `tools` restricts which built-ins exist at all; `allowed_tools` only
# auto-approves. Both are needed: without `tools`, the full Claude Code
# toolset (Bash included) is still reachable through the permission flow.
BUILTIN_TOOLS = ["Read", "Glob", "Grep"]

ALLOWED_TOOLS = [
    *BUILTIN_TOOLS,
    "mcp__concierge__count_lines",
    "mcp__concierge__git_log",
]


def _build_options(resume_session_id: str | None) -> ClaudeAgentOptions:
    return ClaudeAgentOptions(
        system_prompt=SYSTEM_PROMPT,
        tools=BUILTIN_TOOLS,
        allowed_tools=ALLOWED_TOOLS,
        permission_mode="dontAsk",
        cwd=TARGET_REPO_PATH,
        max_turns=MAX_TURNS,
        mcp_servers={"concierge": _concierge_server},
        resume=resume_session_id,
    )


@dataclass
class Conversation:
    id: str
    title: str = "New conversation"
    session_id: str | None = None
    messages: list[dict[str, str]] = field(default_factory=list)


class ConversationStore:
    """In-memory conversation_id -> SDK session_id + transcript mapping.

    This is checkpointer-style short-term memory keyed by an id, same shape
    as the LangGraph checkpointers from Session 3 -- except the Agent SDK
    persists the actual agent state for us; we only need to remember which
    session_id belongs to which conversation_id, plus a transcript for the UI.
    """

    def __init__(self) -> None:
        self._conversations: dict[str, Conversation] = {}

    def create(self) -> Conversation:
        import uuid

        conv_id = uuid.uuid4().hex[:12]
        conv = Conversation(id=conv_id)
        self._conversations[conv_id] = conv
        return conv

    def get_or_create(self, conversation_id: str | None) -> Conversation:
        if conversation_id and conversation_id in self._conversations:
            return self._conversations[conversation_id]
        conv = Conversation(id=conversation_id) if conversation_id else None
        if conv is None:
            return self.create()
        self._conversations[conv.id] = conv
        return conv

    def list(self) -> list[Conversation]:
        return sorted(self._conversations.values(), key=lambda c: c.id, reverse=True)

    def delete(self, conversation_id: str) -> None:
        self._conversations.pop(conversation_id, None)


store = ConversationStore()


async def stream_agent_events(conversation_id: str, message: str) -> AsyncIterator[dict[str, Any]]:
    """Run one turn of the agent for `conversation_id`, yielding progress
    events as they happen and finishing with a `result` (or `error`) event.
    """
    conv = store.get_or_create(conversation_id)
    conv.messages.append({"role": "user", "content": message})
    if conv.title == "New conversation":
        conv.title = message[:60]

    options = _build_options(resume_session_id=conv.session_id)

    try:
        async for msg in query(prompt=message, options=options):
            if isinstance(msg, SystemMessage) and msg.subtype == "init":
                conv.session_id = msg.data["session_id"]
                yield {"type": "session", "session_id": conv.session_id}

            elif isinstance(msg, AssistantMessage):
                for block in msg.content:
                    if isinstance(block, TextBlock):
                        yield {"type": "text", "text": block.text}
                    elif isinstance(block, ToolUseBlock):
                        yield {
                            "type": "tool_use",
                            "tool": block.name,
                            "input": block.input,
                        }

            elif isinstance(msg, ResultMessage):
                if msg.is_error:
                    reply = (
                        "Sorry, I ran into a problem answering that. "
                        f"({msg.subtype})"
                    )
                else:
                    reply = msg.result or "(no answer produced)"
                conv.messages.append({"role": "assistant", "content": reply})
                yield {
                    "type": "result",
                    "reply": reply,
                    "conversation_id": conv.id,
                    "is_error": bool(msg.is_error),
                    "num_turns": msg.num_turns,
                }
    except Exception as exc:  # agent/transport failure: surface politely, no 500
        reply = "Sorry, the concierge agent is unavailable right now. Please try again."
        conv.messages.append({"role": "assistant", "content": reply})
        yield {
            "type": "result",
            "reply": reply,
            "conversation_id": conv.id,
            "is_error": True,
            "error": str(exc),
        }


async def run_agent(conversation_id: str, message: str) -> dict[str, Any]:
    """Non-streaming convenience wrapper: consumes the event stream and
    returns just the final result payload. Used by the plain /api/chat route.
    """
    final: dict[str, Any] = {"reply": "(no answer produced)", "conversation_id": conversation_id}
    async for event in stream_agent_events(conversation_id, message):
        if event["type"] == "result":
            final = event
    return final
