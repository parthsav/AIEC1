from __future__ import annotations

from langchain.agents import create_agent
from langchain_core.messages import AIMessage, HumanMessage, ToolMessage
from langgraph.graph import StateGraph, START, END

from app.models import get_chat_model
from app.tools import get_tool_belt
from app.state import HelpfulState

SYSTEM_PROMPT = (
    "You are a helpful assistant specialized in feline (cat) health. "
    "Only answer questions related to cat health, care, and wellbeing. "
    "If a question is not about cat health, politely decline and remind the "
    "user what you can help with. Do not answer off-topic questions even if "
    "you know the answer. "
    "Use the retrieve_information tool for cat-health questions, web search for "
    "current information, and Arxiv for research papers. Cite tool results when "
    "they inform your answer."
)

inner_agent = create_agent(
        model=get_chat_model(),
        tools=get_tool_belt(),
        system_prompt=SYSTEM_PROMPT,)
    

def prettify(state: dict, label: str = "state") -> None:
    print(f"┌── {label}")
    for key, value in state.items():
        if key != "messages":
            print(f"│ {key}: {value}")
    for msg in state.get("messages", []):
        if isinstance(msg, HumanMessage):
            print(f"│ [human] {msg.content}")
        elif isinstance(msg, ToolMessage):
            print(f"│ [tool] {msg.name}: {str(msg.content)[:150]}")
        elif isinstance(msg, AIMessage):
            if msg.tool_calls:
                calls = ", ".join(tc["name"] for tc in msg.tool_calls)
                print(f"│ [ai] calling tools: {calls}")
            else:
                print(f"│ [ai] {msg.content}")
        else:
            print(f"│ [{msg.type}] {msg.content}")
    print("└──")


def generate_answer(state: dict) -> dict:
    prettify(state, "generate_answer: incoming state")
    response = inner_agent.invoke({"messages": state["messages"]})
    prettify(response, "generate_answer: inner agent response")
    update = {"messages": response["messages"]}
    # a fresh user question (vs. a judge-triggered retry) resets the loop budget
    if isinstance(state["messages"][-1], HumanMessage):
        update["loop_count"] = 0
    return update


MAX_LOOP_COUNT = 2

JUDGE_PROMPT = """You grade whether an assistant's answer is helpful for the user's question.

The assistant is a cat-health specialist and is supposed to decline questions
that are not about cat health. If the question is off-topic and the assistant
politely declined, that counts as helpful (yes).

Question:
{question}

Answer:
{answer}

Reply with exactly one word: yes or no."""

judge_model = get_chat_model()


def judge_helpfulness(state: dict) -> dict:
    loop_count = state.get("loop_count", 0) + 1
    print(f"---> judging (loop {loop_count}/{MAX_LOOP_COUNT})")

    if loop_count >= MAX_LOOP_COUNT:
        print("---> hit max loop count, accepting the answer as-is")
        return {"loop_count": loop_count, "helpful": "yes"}

    question = next(
        m.content for m in state["messages"] if isinstance(m, HumanMessage)
    )
    answer = state["messages"][-1].content

    judge_prompt = JUDGE_PROMPT.format(question=question, answer=answer)
    print("---> judge prompt:\n", judge_prompt)

    judge_response = judge_model.invoke(judge_prompt)
    decision = "yes" if judge_response.content.strip().lower().startswith("yes") else "no"
    print(f"---> judge said {judge_response.content!r} -> {decision}")
    return {"loop_count": loop_count, "helpful": decision}


def route_after_judge(state: dict) -> str:
    return END if state["helpful"] == "yes" else "generate_answer"


graph = StateGraph(HelpfulState)
graph.add_node("generate_answer", generate_answer)
graph.add_node("judge_helpfulness", judge_helpfulness)
graph.add_edge(START, "generate_answer")
graph.add_edge("generate_answer", "judge_helpfulness")
graph.add_conditional_edges("judge_helpfulness", route_after_judge)

graph = graph.compile()

if __name__ == "__main__":
    result = graph.invoke({"messages": [HumanMessage(content="What is the capital of France?")]})
    prettify(result, "final state")


