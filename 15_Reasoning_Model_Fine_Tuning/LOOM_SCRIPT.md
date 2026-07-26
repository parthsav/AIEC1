# Loom Script — Session 15: Reasoning Model Fine-Tuning with GRPO

**Target: under 5:00.** This is a personal reflection, not a technical demo — read it close to verbatim, at a natural, unhurried pace. Timestamps are approximate checkpoints, not exact marks. Bracketed `[Show ...]` cues are optional screen-share moments; skip them if you're just talking to camera.

---

## 0:00–0:45 — Where I started

**SAY:**
> "For Session 15, I fine-tuned Llama-3.2-3B into a reasoning model using GRPO — the reinforcement learning method behind DeepSeek-R1. I want to walk through this one a little differently, because honestly, it broke my brain more than the others.

> Every session before this — RAG, agents, evals — I was *using* a pretrained model. This was the first time I opened the hood and changed one. I didn't know what LoRA was. I didn't know what a reward function was. I didn't even know if GSM8K was a model or a dataset."

## 0:45–1:45 — The part that didn't click at first

**SAY:**
> "The idea that took longest to land: GSM8K already has questions *and* answers in it. So my first reaction was — wait, isn't that just showing the model the answers? Isn't that cheating?

> It's not. The model gets the question, never the worked solution. It writes its own reasoning from a blank page, submits a guess, and only *afterward* does a separate piece of code check that guess against a hidden answer key. The model never sees the correct number — only the reward function does, after the fact. That's the real difference between showing an example and grading one. Once that clicked, GRPO stopped feeling like a trick and started feeling like an actual idea."

## 1:45–2:45 — Where it went wrong, and what I did about it

**SAY:**
> "I also want to be honest this wasn't smooth. Partway through actually running this in Colab, I hit a CUDA 'illegal memory access' error right as the trainer was built. Scary-looking the first time you see it — but the fix wasn't complicated: restart the runtime, run every cell top to bottom, don't skip around. The real lesson wasn't the error itself, it was learning that a scary stack trace often means something upstream broke, not the line where it surfaced. That's a debugging instinct I didn't have walking in."

## 2:45–3:45 — What actually came out of it

**SAY:**
> "[Show the LoRA percentage / training log] It ran 175 steps on an L4 GPU, about 46 minutes. The number that stuck with me most: only 2.94% of the model's parameters were ever touched. Everything else stayed frozen. That's LoRA — freeze the giant matrix, train two tiny ones, and the correction they produce is enough to change behavior.

> [Show the before/after 'Calculate pi' output] The before-and-after was the payoff. Before training: I asked it to calculate pi and got a rambling wall of text with no structure. After: same prompt, same frozen weights, just a different adapter swapped in — and it reliably used the reasoning-and-answer format I trained it toward. The actual digits were garbage, honestly, but that's fair — pi was never part of what it practiced on. The format transferred. The math didn't, because it was never supposed to."

## 3:45–4:45 — What I'm taking away from this

**SAY:**
> "The bigger realization wasn't about math models specifically. This whole recipe — reward an attempt instead of showing a solution — works for *any* task where I can check if an attempt is good, even without a perfect rule for 'good.' I actually worked through applying it to a side project of mine — pulling guitar tabs out of a YouTube clip — and realized the reward doesn't need a hand-labeled correct tab at all. It can just resynthesize my guess and check if it sounds like the original.

> I walked in not knowing what fine-tuning meant. I walked out having actually trained a model, watched it change behavior, and understanding a general technique I can now point at problems that have nothing to do with math homework."

**[END — approx. 4:45]**
