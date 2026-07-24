# Mission: Reinforcement Learning with Verifiable Rewards (RLVR)

## Why
Parth is continuing the AI Engineering Certification into Session 16. Session 15 taught him to change a model's weights with GRPO, using reward functions he mostly took as given. This session builds the *other half* of that loop — the verifier and reward function themselves, plus the data pipeline (audit trail, preference pairs) built around them — using [[MISSION|the same GRPO vocabulary]] from Session 15 but no GPU, since sampling happens against a small API model (`gpt-4.1-nano`) instead of a locally trained one.

## Success looks like
- Explain in one sentence what makes a reward "verifiable" (a deterministic program checks it, not a human or a learned model), and give one task where that's possible and one where it fundamentally isn't
- Explain why the reward is asymmetric (+1.0 correct / −0.1 incorrect) and what a harsher penalty (−1.0) would train a struggling policy to do instead
- Trace why sampling *groups* of completions (not one) is the same structure GRPO's group-relative advantage consumed in Session 15 — and why it also produces the correct/incorrect contrast preference pairs need
- Name at least two ways a policy could hack a `\boxed{}` exact-match verifier beyond "no visible work," and how to harden against each
- Explain the difference between the math verifier's binary reward and the code verifier's fractional reward, and the real security risk of running model-generated code un-sandboxed
- Explain how the same verified/audited samples become two different things: `{prompt, chosen, rejected}` pairs for DPO, or raw group rewards for GRPO
- Answer the notebook's four questions (Q1–Q4) and complete Activity #1 (build a third verifier domain) in his own words

## Constraints
- Same learner profile as [[../15_Reasoning_Model_Fine_Tuning/MISSION.md|Session 15]]: comfortable with LLM usage (prompts, RAG, agents), new to training/RL vocabulary — but Session 15 is now *behind* him, so LoRA, policy, reward, GRPO, and reward-stacking can all be assumed known and referenced directly rather than re-taught
- New to Python (see cross-session memory `user-new-to-python`) — plain-language comments before every function, syntax call-outs up front
- No GPU needed this session (API-model sampling only) — but Task 6 executes model-generated code in a local subprocess, which is itself a teaching moment about sandboxing, not just a setup step
- Wants illustrations, animations, and step-through diagrams over text; one new idea per visual; worked concrete examples over abstract description
- Learning happens in conversation sessions tied to certification homework deadlines

## Out of scope
- Running the notebook's actual OpenAI API calls during teaching (no live execution assumed) — ground lessons in the notebook's described behavior and code, same as Session 15's no-GPU approach
- PPO/RLHF internals beyond the contrast needed for Question #1 (verifiable reward vs. learned reward model)
- Production sandboxing implementation detail (Firecracker/gVisor internals) beyond "this is a security boundary, and here's why the demo's subprocess isn't one"
- Symbolic math verification (SymPy-based equivalence checking) — the notebook only does exact string/numeric match
