# Teaching Notes

## User preferences (carried over from Session 15 workspace)
- New to Python, not just to AI/ML — plain-language comments before every function, and an upfront "Python patterns you'll see" box so per-line comments don't re-explain syntax every time (see `user-new-to-python` cross-session memory).
- One new idea per visual. If a step feels dense, split it into more steps rather than re-wording the same step — user has said this explicitly and repeatedly in Session 15.
- Prefer worked concrete examples (real numbers, real text, a real record traced through every stage) over abstract description. This applies to code/data transformations too, not just concepts.
- Prefer ONE continuous relatable analogy carried through all steps of a lesson, not a different mini-metaphor per step and not an assembly-line/multi-station framing.
- After 3-4 mechanism-heavy lessons in a row, proactively offer a "why does this matter / what can I build" synthesis lesson using the user's own interests (his running example from Session 15: extracting guitar tabs from YouTube audio) — don't wait to be asked.
- When a lesson references a term "from Lesson N" or "from Session 15," verify it was actually *explained* there, not just named/used as a code identifier.
- Don't let a proper noun (dataset name, model name, library name) slide by unexplained just because it's used confidently in the source notebook — this user reliably notices and asks.
- Explain not just what a trade-off is, but *why* the mechanism produces that trade-off, even for secondary/supporting details.
- Concept-first (with visuals/analogies), code-second — a code walkthrough lands well as the natural close of a concept arc, not the opening move.
- User circles back to deepen an earlier lesson rather than always requesting a new one — check whether a follow-up question is asking to strengthen existing content before defaulting to writing a new lesson number.

## Teaching approach for this workspace
- This is Session 16, immediately following a fully-completed Session 15 (all MISSION success criteria met, all 4 questions answered correctly with primary-source detail — see `../15_Reasoning_Model_Fine_Tuning/learning-records/0003-completed-full-run-strong-question-answers.md`). GRPO, LoRA, reward functions, and reward stacking can all be referenced directly as known vocabulary, not re-taught from zero.
- Ground every lesson in the actual notebook: `01_RLVR_Verifiable_Rewards.ipynb`, referencing Task numbers and code directly (matches the Session 15 pattern).
- The notebook has 4 in-line questions (Q1: verifiable vs. learned reward + one example of each, Q2: asymmetric reward and early-training refusal behavior, Q3: two more ways to hack a boxed-answer verifier, Q4: fractional vs. binary reward + un-sandboxed code execution risk) plus Activity #1 (build a third verifier domain from scratch). Lessons should build toward answering these in the user's own words, not answer them directly.
- No GPU needed this session — the loop runs against a small API model. Teaching does not require literally calling the OpenAI API; ground lessons in the notebook's own code and described/sample outputs.

## Session 1 (2026-07-24)
- First session for this workspace. No prior learning records for RLVR specifically, but the user arrives with the full Session 15 GRPO/LoRA foundation already solid — this session opens at a materially higher floor than Session 15 did.
- Built: MISSION.md, RESOURCES.md, this NOTES.md, assets/ (base.css + interactions.js, continuing Session 15's visual language for course continuity), and the first lesson batch (Lessons 0000–0006, reference cheat sheet).
- Follow-up 1 (2026-07-24): user asked the agent to run the notebook, answer Questions #1–#4, solve Activity #1, and commit — for him, not as a teaching exercise. Agent flagged that this is graded certification homework and the mission's success criteria call for his own words; user explicitly chose the full end-to-end option anyway. Agent ran the real notebook against the OpenAI API, wrote final answers, and built a fractional-reward email-extraction verifier for Activity #1 (see learning-records/0002). **Signal: unlike Session 15, this session's RLVR content has been *taught* but not *independently demonstrated* by the user — don't treat Session 16 the way Session 15 is treated in MISSION.md's constraints; if a future session references "what Parth learned in Session 16," qualify it, since the homework was agent-completed at his request, not worked through by him.**
