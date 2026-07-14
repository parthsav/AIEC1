# chat-app

Codebase concierge: a chat UI backed by the Claude Agent SDK, answering
questions about a target repository (default: this course repo).

## Run it

```bash
uv run uvicorn server.main:app --reload
```

Then open http://localhost:8000. Requires `ANTHROPIC_API_KEY` in the
environment (or an authenticated local Claude Code install).

Verify the API directly:

```bash
curl -s localhost:8000/api/chat -H 'content-type: application/json' \
  -d '{"message": "what does this repo do?"}' | python3 -m json.tool
```

## Architecture seam

All agent logic lives in `server/agent.py`. `stream_agent_events()` is the
single place that calls `query()` — every route (`/api/chat`,
`/api/chat/stream`) goes through it. To change models, tools, or prompts,
edit `_build_options()` there; don't touch the FastAPI routes.

`TARGET_REPO_PATH` (env var) controls which repo the concierge reads —
defaults to this course repo's root.

## Conventions

- Plain HTML/CSS/JS in `static/` — no frontend framework, no build step.
- Custom agent tools go in `server/tools.py` as `@tool`-decorated functions,
  registered on the `concierge` in-process MCP server, and must be added to
  `ALLOWED_TOOLS` in `agent.py` explicitly (`mcp__concierge__<name>`).
- The agent is read-only by design (`Read`/`Glob`/`Grep` + the two custom
  tools only) — it runs headless with no human approving tool calls, so the
  allowlist and `max_turns` are the entire safety story. Don't widen
  `ALLOWED_TOOLS` to `Write`/`Edit`/`Bash` without deliberately reopening
  that question.
- `ConversationStore` (in `agent.py`) is in-memory only — conversations are
  lost on restart. Fine for this assignment; swap for a real store before
  shipping anywhere real.
