# Codebase Concierge

A chat web app powered by the Claude Agent SDK. Point it at any repository
and ask it questions — it reads files, greps, and answers, with citations to
real file paths.

## Setup

```bash
uv sync
export ANTHROPIC_API_KEY="sk-ant-..."   # or rely on a locally authenticated `claude` CLI
```

Optional: point it at a different repo (defaults to this course repo's root):

```bash
export TARGET_REPO_PATH="/path/to/any/repo"
```

## Run

```bash
uv run uvicorn server.main:app --reload
```

Open http://localhost:8000.

## Verify

```bash
curl -s localhost:8000/api/chat \
  -H 'content-type: application/json' \
  -d '{"message": "what does this repo do?"}'
```

## What's implemented

- `GET /` — chat UI (`static/index.html`, plain HTML/CSS/JS)
- `POST /api/chat` — single-shot JSON reply (curl/CI friendly)
- `POST /api/chat/stream` — Server-Sent Events: live `tool_use` and `text`
  events as the agent works, followed by a final `result` event
- `GET/POST/DELETE /api/conversations` — multi-conversation support; each
  conversation maps to its own Agent SDK `session_id` for resumed context
- Two custom tools on the agent (`server/tools.py`):
  - `count_lines` — exact line counts instead of guesses
  - `git_log` — recent commit history for the target repo
- Read-only tool allowlist (`Read`, `Glob`, `Grep`, the two custom tools) +
  `max_turns=25` — the agent cannot modify the filesystem no matter what a
  user types in the chat box
- Errors from the agent surface as a normal chat bubble, never a 500

## Project layout

```text
chat-app/
├── server/
│   ├── main.py      # FastAPI routes
│   ├── agent.py     # query() wrapper, session/conversation store
│   └── tools.py     # custom @tool definitions
├── static/          # chat UI: index.html, style.css, app.js
├── scratch_query.py # Task 5: query() in isolation
└── CLAUDE.md
```
