# RLVR (Reinforcement Learning with Verifiable Rewards) Resources

## Knowledge

- [Tülu 3: Pushing Frontiers in Open Language Model Post-Training — Lambert et al., AI2 (arXiv:2411.15124)](https://arxiv.org/abs/2411.15124)
  The paper that coined "RLVR." Section on RLVR describes replacing the learned RLHF reward model with a deterministic verification function. Use for: the canonical definition of RLVR and how it sits inside a full post-training recipe (alongside SFT and DPO).
- [DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning (arXiv:2501.12948)](https://arxiv.org/abs/2501.12948)
  Already the primary source for Session 15's GRPO lessons. Use for: how a rule-based (verifiable) accuracy reward plus a format reward trained reasoning with no learned reward model at all — the large-scale version of exactly what this notebook does in miniature.
- [Direct Preference Optimization: Your Language Model is Secretly a Reward Model — Rafailov et al. (arXiv:2305.18290)](https://arxiv.org/abs/2305.18290)
  The original DPO paper. Use for: what a `{prompt, chosen, rejected}` triple is actually used for once Task 7 builds one — DPO trains directly on the pair, no separate reward model or RL rollout needed.
- [TRL DPOTrainer docs — Hugging Face](https://huggingface.co/docs/trl/main/en/dpo_trainer)
  Use for: the exact dataset schema (`prompt`/`chosen`/`rejected`) the notebook's `preferences.jsonl` is built to match, and what training on it actually looks like in code.
- [Reward Hacking in Reinforcement Learning — Lilian Weng](https://lilianweng.github.io/posts/2024-11-28-reward-hacking/)
  High-trust, widely-cited practitioner writeup (formerly OpenAI). Use for: Task 5's hack-detection design and Question #3 — a taxonomy of how policies exploit reward functions, beyond the notebook's single "no visible work" heuristic.
- [Goodhart's Law in Reinforcement Learning — Karwowski et al. (arXiv:2310.09144)](https://arxiv.org/pdf/2310.09144)
  Use for: the formal version of the Goodhart's-law framing the notebook invokes directly in Task 5's markdown.
- [Vercel Sandbox docs — "Understanding Sandboxes"](https://vercel.com/docs/sandbox/concepts)
  The exact production example the notebook cites in "What Looks Different in Production." Use for: what a real isolation boundary (Firecracker microVM) looks like, in contrast to the notebook's bare `subprocess` call in Task 6.

## Wisdom (Communities)

- No community preference stated yet this session. Session 15's NOTES.md records no opt-out either — revisit if the user wants a place to discuss RLVR/DPO pipeline design with other practitioners (e.g. the Hugging Face TRL GitHub discussions, or r/MachineLearning for paper-level discussion).

## Gaps

- No resource yet on symbolic math verification (SymPy-based answer equivalence) — flagged as out of scope in MISSION.md for now, but worth filling if a future session pushes past exact-match checking.
- No resource yet on sandboxed code execution *implementation* (gVisor/Firecracker internals) beyond the Vercel Sandbox conceptual docs above — fine for this session's scope (a security-boundary awareness, not a build-your-own-sandbox lesson).
