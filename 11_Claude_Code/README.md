<p align = "center" draggable="false" ><img src="https://github.com/AI-Maker-Space/LLM-Dev-101/assets/37101144/d1343317-fa2f-41e1-8af1-1dbb18399719"
     width="200px"
     height="auto"/>
</p>

<h1 align="center" id="heading">Session 11: Claude Code & the Claude Agent SDK</h1>

| 📰 Session Sheet | ⏺️ Recording | 🖼️ Slides | 👨‍💻 Repo | 📝 Homework | 📁 Feedback |
|:-----------------|:-------------|:----------|:----------|:------------|:------------|
| [Session 11: Claude Code & Claude Agent SDK ](https://github.com/AI-Maker-Space/The-AI-Engineering-Certification-v1.0/tree/main/00_Docs/Modules/11_Claude_Code) |[Recording!](https://us02web.zoom.us/rec/share/2I5HA6DwVFgmtyjPaq1SJDgkaVEuYZoWYyMCK8DOAZ99Zm6f7dTi0IGONXj6mRel.YHFzKF03mI5v6JAM) <br> passcode: `&Qhi!cf0`| [Session 11 Slides](https://canva.link/uw1cl42x84tm6zh) |You are here! <br><br> [Certification Challenge](https://github.com/AI-Maker-Space/The-AI-Engineering-Certification-v1.0/tree/main/00_Docs/Certification%20Challenge) | [Optional Session 11 Assignment](https://forms.gle/sAyr5BgBLTfgJV8EA) <br><br>  [Cert Challenge Submission Form](https://forms.gle/xtM9F38nfRKcdjH97)| [Feedback 7/7](https://forms.gle/oDrguLDNvva65mtM8) |

## Useful Resources

**Claude Code**
- [Claude Code Documentation](https://code.claude.com/docs) — official docs: setup, workflows, settings
- [Claude Code Quickstart](https://code.claude.com/docs/en/quickstart) — from install to first session
- [Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices) — Anthropic engineering guide

**Claude Agent SDK**
- [Agent SDK Overview](https://docs.anthropic.com/en/api/agent-sdk/overview) — what the SDK is and when to use it
- [Building Agents with the Claude Agent SDK](https://www.anthropic.com/engineering/building-agents-with-the-claude-agent-sdk) — Anthropic engineering deep dive

## Main Assignment

**Build a chat web app powered by the Claude Agent SDK** — and build it *with* Claude Code.

This session is markdown-only on purpose. There is no starter code and no notebook: every line of code in your final app will be written in collaboration with Claude Code. The session has one build arc across a single breakout room:

```text
you → Claude Code → chat app skeleton → wire in Agent SDK query()
      (FastAPI + chat UI, echo stub)      ├─ tools: Read / Glob / Grep
                                           └─ your custom tool
```

The finished product: a **codebase concierge** — a chat interface in the browser where an agent (with real tools) answers questions about any repository you point it at. In Session 10 you served models behind endpoints; today you serve an *agent* behind one.

Work through the three guides in order:

```text
01_Installing_Claude_Code.md   # install, authenticate, verify
02_Using_Claude_Code.md        # drive Claude Code; scaffold the chat app skeleton
03_Claude_Agent_SDK.md         # add the agent and connect it to your website
```

## Outline

### Breakout Room #1: Claude Code, the Agent SDK, and the Connection

- Task 1: Install Claude Code and authenticate ([guide](./01_Installing_Claude_Code.md))
- Task 2: Learn the loop — explore a repo you didn't write ([guide](./02_Using_Claude_Code.md))
- Task 3: Scaffold the chat app skeleton with Claude Code (plan → implement → verify)
- Task 4: Write the project's `CLAUDE.md`
- Question #1 and Question #2
- Task 5: Install the Agent SDK and run your first `query()` ([guide](./03_Claude_Agent_SDK.md))
- Task 6: Wire the agent into `/api/chat` — replace the echo stub
- Task 7: Conversation memory — resume sessions across messages
- Task 8: Give the agent a custom tool
- Question #3 and Question #4
- Activity #1: Level Up the Chat App

## Questions

### ❓ Question #1

While scaffolding in Task 3 you used **plan mode** before letting Claude Code write anything. Why does an agent that can execute shell commands need a permission system at all, and why is plan mode particularly valuable when starting a project from an empty directory?

#### ✅ Answer

A permission system exists because "can execute shell commands" and "should execute this particular shell command right now" are different questions, and only a human can reliably answer the second one for consequential or irreversible actions (`rm -rf`, a force-push, an `ALTER TABLE`). The model is very good at picking a plausible next tool call, but it has no skin in the game and no ground truth about what's actually safe in *your* environment — a gate that gives a human the chance to say "wait, not that" before anything runs is the cheapest possible insurance against an entire class of mistakes.

Plan mode is especially valuable on an empty directory because there's no existing code to anchor a conversation about "is this right?" — normally you could point at a diff and say "this line is wrong." With nothing there yet, the only thing to review *is* the plan: file layout, framework choices, where the seams go (e.g. the isolated echo-stub function in Task 3). Read-only mode forces that conversation to happen in words, before any of it is baked into files you'd otherwise have to unwind. It's much cheaper to say "actually, make the stub a separate function" in a plan than to ask for a refactor five files later.

### ❓ Question #2

`CLAUDE.md` is loaded into context at the start of every session. What belongs in it — and what *doesn't*? How does this relate to what you learned about context management and memory in Session 3?

#### ✅ Answer

`CLAUDE.md` should hold what's expensive to rediscover and cheap to state: the run/verify commands, the one or two architectural decisions that aren't obvious from the file tree (e.g. "the chat logic lives in one swappable function; `/api/chat` is the seam where the agent gets wired in"), and conventions the codebase can't self-enforce (plain JS, no frameworks). It should *not* contain anything a `Read` or `Glob` call would surface on its own — file listings, function signatures, long prose walkthroughs — because that's stale the moment the code changes, and every line in it is paid for in every single future session whether or not that session needs it.

That's exactly the tradeoff from Session 3: it's a fixed-size, always-loaded context budget, the same problem summarization middleware and checkpointers solve for a running conversation. The difference is *when* the compression happens — a checkpointer trims history live, mid-conversation; `CLAUDE.md` is compression done once, by hand, ahead of time, for information that's true across every session rather than specific to one. Writing a good one is the same skill as writing a good conversation summary: keep the load-bearing facts, drop everything derivable or transient.

### ❓ Question #3

The Agent SDK gives you the same agent loop that powers Claude Code. Compare this to the agent loops you hand-built with LangGraph in Sessions 2–4: what does the SDK give you for free, and what control do you give up?

#### ✅ Answer

Building `chat-app`, the entire read/search/tool-call loop — including retries, context compaction, and the plumbing that turns a raw model response into typed `AssistantMessage`/`ToolUseBlock`/`ResultMessage` events — came from one `query()` call and about 40 lines of code in `agent.py`. In LangGraph I'd have hand-built the node that calls the model, the conditional edge that routes to tools vs. END, the tool-execution node, and the state object threading messages between them — useful when you need that, wasted effort when you don't. Session persistence was similarly free: `resume=session_id` (Task 7) replaces a checkpointer I would otherwise have wired up myself.

What I gave up is topology and provider choice. A LangGraph graph can branch into parallel subagents, loop back conditionally, insert a human-approval node mid-flight, or call a non-Claude model for one step — arbitrary shapes. The SDK gives you one shape: a single agent loop, Claude-only, configured through `ClaudeAgentOptions` rather than assembled from graph primitives. For "codebase concierge" that loop is exactly the right shape, so the trade was free. It stops being free the moment a task needs a topology the loop doesn't have — e.g. the Session 4 multi-agent researcher's fan-out/fan-in over parallel subagents isn't something `ClaudeAgentOptions` can express; you'd be back to LangGraph (or the SDK's own subagent feature, which is narrower).

### ❓ Question #4

Your chat app could have called a chat completions API directly, the way you did early in the course. What do you gain by routing every message through the Agent SDK's `query()` instead — and what new risks does an agent with tools introduce that a plain chat completion doesn't have? How did your tool allowlist and permission mode address them?

#### ✅ Answer

A plain chat completion only ever produces text — it can *describe* what's in `agent.py`, but it can't actually open the file, so every answer is a guess grounded in whatever was in the prompt. Routing through `query()` gets the app real, current facts: `Read`/`Glob`/`Grep` let it cite `agent.py:41-47` for a claim instead of hallucinating it, and it can page through files far larger than would ever fit in one prompt.

The new risk is exactly that capability: a chat completion has no way to touch the filesystem no matter what a user types, but an agent with tools does — pointed at a shell or write access, a crafted message becomes a path to running commands or overwriting files on a server with no human watching. My `chat-app` addresses this with three layered controls in `server/agent.py`, and building it taught me a subtlety worth recording: `allowed_tools` alone is **not** a restriction — it only marks tools as pre-approved, and I caught the agent happily running `Bash` commands through the normal permission flow despite `Bash` never being allowlisted. The actual gate is the combination of `tools=["Read", "Glob", "Grep"]` (which removes every other built-in from existence — `Bash` and `Write` aren't denied, they're *not there*) with `permission_mode="dontAsk"` (anything not pre-approved is denied instead of waiting on a prompt no one will ever answer). On top of that, `max_turns=25` bounds a single request so no query can loop indefinitely and run up cost or hang the server, and the whole `query()` call is wrapped in a `try/except` so a tool failure or API error becomes a normal chat reply instead of a 500 or a stack trace leaking back to the browser.

## Activity 1: Level Up the Chat App

Extend your working chat app with **at least one** of the following (built with Claude Code, of course):

1. **Live progress streaming** — stream the agent's activity to the browser (e.g. via Server-Sent Events) so users see tool calls ("reading `app.py`…") while the agent works, instead of a spinner
2. **Multi-conversation support** — a sidebar of separate conversations, each mapped to its own SDK session
3. **A second custom tool** — something genuinely useful for your target repo (e.g. `git_log` for recent changes, or a test-runner summary tool)

Whichever you pick, demo it in your Loom video and explain the design decision in one paragraph.

## Advanced Activity: The Cat Shop Concierge

Connect your Session 8 cat shop MCP server to your chat app's agent via the SDK's `mcp_servers` option. Your chat app becomes a shopping concierge: users can browse the catalog, fill a cart, and check out — in natural language, through the UI you built, hitting the OAuth-protected server you wrote in Session 8.

Include your findings and a demo in your Loom video.

## Ship 🚢

The working chat app!

### Deliverables

- A short Loom showing:
  - Claude Code scaffolding or extending the app (plan → implement → verify — show the plan!); and
  - the chat app answering real questions about a repository, including at least one visible custom-tool use

## Share 🚀

Make a social media post about your final application!

### Deliverables

- Make a post on any social media platform about what you built!

Here's a template to get you started:

```
🚀 Exciting News! 🚀

I am thrilled to announce that I have just built and shipped a chat app powered by the Claude Agent SDK — scaffolded entirely with Claude Code! 🎉🤖

🔍 Three Key Takeaways:
1️⃣
2️⃣
3️⃣

Let's continue pushing the boundaries of what's possible in the world of AI agents. Here's to many more innovations! 🚀
Shout out to @AIMakerspace !

#ClaudeCode #AgentSDK #AIAgents #Innovation #AI #TechMilestone

Feel free to reach out if you're curious or would like to collaborate on similar projects! 🤝🔥
```

## Submitting Your Homework (Optional For Extra Mark)

Follow these steps to prepare and submit your homework:

1. Pull the latest updates from upstream into the main branch of your repo:

```bash
git checkout main
git pull upstream main
git push origin main
```

2. Work through `01_Installing_Claude_Code.md`, `02_Using_Claude_Code.md`, and `03_Claude_Agent_SDK.md` in order.
3. Build your chat app in a new `chat-app/` folder inside this session directory (include its `CLAUDE.md` — we want to see it!).
4. Fill in your answers to Questions #1–#4 in this README.
5. Complete Activity #1 and record your Loom video.
6. Add, commit, and push your work to your origin repository. Remove `.env` files and API keys before committing.

When submitting your homework, provide the GitHub URL to your repo.
