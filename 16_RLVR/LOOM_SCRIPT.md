# Loom Script — Session 16: RLVR (Reinforcement Learning with Verifiable Rewards)

**Target: under 5:00.** Personal reflection, not a technical demo — read close to verbatim, unhurried. Timestamps are approximate checkpoints. Bracketed `[Show ...]` cues are optional screen-share moments.

---

## 0:00–0:45 — Where this session picked up

**SAY:**
> "Session 15 was about the player — I changed a model's weights with GRPO and rewarded it for correct answers. But I never once asked who was standing there deciding 'correct.' That referee was just handed to me, already built. Session 16 is where I build the referee myself: the verifier, and everything around it that makes a reward trustworthy enough to actually train on."

## 0:45–1:45 — The part that reframed everything

**SAY:**
> "The core idea is simpler than it sounds: a reward is 'verifiable' when a deterministic program checks it, not a person and not another trained model. RLHF trains a whole separate neural network to *guess* what a human would rate highly — that's an approximation, and it can be wrong. RLVR skips that network entirely and uses a real check: does the boxed number match the ground truth? Do the unit tests pass?

> The design choice that actually surprised me was the reward itself: +1.0 for correct, but only −0.1 for wrong — not −1.0. I worked through why with a negative-marking analogy, the way some standardized tests deduct a small amount for a wrong answer instead of a harsh one. If the penalty were as harsh as the reward, a genuine wrong attempt and a total non-answer would score identically — and early in training, when most attempts fail, that erases exactly the signal you need the model to learn from."

## 1:45–2:45 — What actually happened when I ran it

**SAY:**
> "[Show the verified-correct rate output] I ran the real loop against `gpt-4.1-nano` — 5 math problems, 4 sampled attempts each, 20 samples total. 85% verified correct, 17 of 20. And the 3 failures were genuinely interesting, not random noise: on the train-speed problem, the model kept doing the math exactly right — got 80 — but wrote its boxed answer as `\boxed{80 \text{ km/h}}` instead of just `80`. My exact-match verifier choked on the units and marked a correct answer wrong. That's not a bug I introduced — that's Lesson 0001's whole warning about brittle verifiers punishing correct reasoning, happening for real, in my own run.

> [Show the audit trail output] Zero of those 20 samples got flagged by my hack detector, which matters — it means every failure was a genuine mistake, not the model gaming the checker. That's the audit trail doing its job: telling the difference between 'wrong' and 'cheating,' which a raw reward number alone can't do."

## 2:45–3:30 — Two consumers, one verifier

**SAY:**
> "[Show the preference pairs output] The same verified group fed two different things. Session 15's GRPO would've just averaged that group's rewards. This session, I also built `{prompt, chosen, rejected}` pairs straight out of the same data — one correct attempt paired against one of the incorrect ones, 3 pairs total, ready for a DPO-style trainer. Same referee, same verdicts, two completely different ways to turn them into training."

## 3:30–4:45 — Activity #1: building my own verifier

**SAY:**
> "For the activity I built a third verifiable domain from scratch: extracting email addresses out of a block of text, checked against a reference regex instead of a single exact answer. I made it fractional on purpose — like the code verifier's tests-passed fraction — because getting 2 of 3 emails right is a real partial success, not a flat failure. I also added a hallucination penalty: if the model invents an email that was never actually in the text, that's the same shape of problem as a policy parroting a number from a math prompt.

> [Show the activity output] Then I tried to actually break it — I wrote two adversarial cases on purpose: one describing a company by name and domain with no real email listed, tempting the model to just guess one, and one with an email written out in words ('jordan at brightpath dot io') instead of a real address. The honest result: 100% verified correct, 20 of 20, and zero hallucinations, even under those traps. That's a real finding, not a letdown — it told me `gpt-4.1-nano` is genuinely reliable at a narrow, well-specified extraction task, in a way it wasn't for open-ended math reasoning. Verifiable rewards work best exactly where 'correct' has no ambiguity, and this activity showed me that in both directions: a domain that's tight enough to check turns out to also be tight enough for the model to just get right."

## 4:45–5:00 — What I'm taking away

**SAY:**
> "Session 15 taught me how to train against a reward. This one taught me that the reward itself is the whole ballgame — its quality is the ceiling on everything downstream. Build a brittle verifier, and it can punish correct answers or, worse, invite the model to game it. Build a good one, audit it honestly, and the exact same verified data can feed a GRPO update or become preference data for DPO. Two algorithms, one real bottleneck: whether the referee can actually be trusted."

**[END — approx. 5:00]**
