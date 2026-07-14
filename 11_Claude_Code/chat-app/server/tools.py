"""Custom in-process MCP tools for the codebase concierge agent."""

import asyncio
import os

from claude_agent_sdk import create_sdk_mcp_server, tool


@tool("count_lines", "Count the lines of code in a single file", {"file_path": str})
async def count_lines(args: dict) -> dict:
    path = args["file_path"]
    try:
        with open(path, encoding="utf-8", errors="replace") as f:
            n = sum(1 for _ in f)
        return {"content": [{"type": "text", "text": f"{path}: {n} lines"}]}
    except OSError as exc:
        return {
            "content": [{"type": "text", "text": f"Could not read {path}: {exc}"}],
            "is_error": True,
        }


@tool(
    "git_log",
    "Show the most recent git commits for the target repo (subject, author, relative date)",
    {"limit": int},
)
async def git_log(args: dict) -> dict:
    limit = max(1, min(int(args.get("limit", 10)), 50))
    cwd = os.environ.get("TARGET_REPO_PATH", ".")
    proc = await asyncio.create_subprocess_exec(
        "git",
        "log",
        f"-{limit}",
        "--pretty=format:%h  %ad  %an  %s",
        "--date=relative",
        cwd=cwd,
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE,
    )
    stdout, stderr = await proc.communicate()
    if proc.returncode != 0:
        return {
            "content": [
                {"type": "text", "text": f"git log failed: {stderr.decode().strip()}"}
            ],
            "is_error": True,
        }
    return {"content": [{"type": "text", "text": stdout.decode() or "(no commits)"}]}


def build_concierge_server():
    return create_sdk_mcp_server(
        name="concierge", version="1.0.0", tools=[count_lines, git_log]
    )
