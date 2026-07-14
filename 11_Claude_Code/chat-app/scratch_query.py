"""Task 5 scratch script: feel the query() primitive in isolation before
wiring it into the FastAPI endpoint. Run with: uv run scratch_query.py
"""

import asyncio

from claude_agent_sdk import ClaudeAgentOptions, query


async def main():
    async for message in query(
        prompt="What does this project do? Answer in two sentences.",
        options=ClaudeAgentOptions(
            allowed_tools=["Read", "Glob", "Grep"],
            cwd=".",
        ),
    ):
        print(type(message).__name__)
        if hasattr(message, "result"):
            print("\n" + message.result)


if __name__ == "__main__":
    asyncio.run(main())
