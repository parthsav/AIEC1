# Mission: Reasoning Model Fine-Tuning with GRPO

## Why
Parth is completing the AI Engineering Certification, and Session 15's homework requires fine-tuning `Llama-3.2-3B-Instruct` into a reasoning model with Unsloth + GRPO. Unlike sessions 1–14 (RAG, agents, evals, MCP — all about *using* a pretrained model), this is the first session that changes a model's weights, and it introduces a full new vocabulary (LoRA, reward functions, policy, KL penalty) with no prior scaffolding — hence starting from zero.

## Success looks like
- Explain LoRA in one sentence (freeze the big matrix, train two small ones) and say why that makes fine-tuning cheap
- Trace the GRPO loop end to end: prompt → sample a group of completions → score each with reward functions → compare to the group average → nudge the policy → repeat
- Explain why GRPO needs no critic/value network, unlike PPO-style RLHF — and why watching reward *go up* replaces watching loss *go down*
- Read the `print(model)` architecture dump and correctly label embeddings, attention, and feed-forward blocks (Question #2 in the notebook)
- Explain why GSM8K needs no reasoning traces — just a checkable final answer — and why reward functions are stacked (format rewards give partial credit before correctness is ever right)
- Answer the notebook's four questions in their own words, correctly

## Constraints
- Complete beginner to model training specifically — comfortable with "using" LLMs (prompts, RAG, agents) but has never trained one
- No dedicated GPU session assumed — teaching must work without literally running the multi-hour training job
- Wants illustrations, animations, and step-through diagrams over text; text should be short and simple ("explain like I'm new to this, don't understand anything")
- Learning happens in conversation sessions tied to certification homework deadlines

## Out of scope
- Full DeepSeek-R1 paper reproduction (this notebook is a simplified version — no SFT cold-start stage)
- vLLM internals beyond "it's the fast-generation engine GRPO leans on"
- Transformer attention math derivation — only enough architecture vocabulary to answer Question #2
- Production deployment / serving the trained model
