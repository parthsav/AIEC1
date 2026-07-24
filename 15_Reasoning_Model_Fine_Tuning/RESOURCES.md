# Reasoning Model Fine-Tuning Resources

## Knowledge

- [LoRA: Low-Rank Adaptation of Large Language Models (paper)](https://arxiv.org/abs/2106.09685)
  The original LoRA paper. Use for: the `W + BA` formula, why rank matters, why only attention/MLP projections need adapters.
- [QLoRA: Efficient Finetuning of Quantized LLMs (paper)](https://arxiv.org/abs/2305.14314)
  Introduces 4-bit NF4 quantization and double quantization. Use for: Question #1 (what double quantization saves, and why this notebook skips it for 16-bit LoRA instead).
- [Sebastian Raschka — "Practical Tips for Finetuning LLMs Using LoRA"](https://magazine.sebastianraschka.com/p/practical-tips-for-finetuning-llms)
  Plain-language walkthrough of LoRA hyperparameters (rank, alpha, target modules) with ablation results. Use for: grounding the `r = 64`, `lora_alpha = 64`, `target_modules` choices in Task 3.
- [DeepSeekMath (paper) — introduces GRPO](https://arxiv.org/abs/2402.03300)
  Section 4 defines Group Relative Policy Optimization formally. Use for: the group-relative advantage formula and why it removes the critic network.
- [DeepSeek-R1 (paper)](https://arxiv.org/abs/2501.12948)
  Shows GRPO applied to reasoning at scale, including the "Aha moment" where reward suddenly climbs. Use for: grounding what Task 7's reward curve is actually showing.
- [Hugging Face TRL — GRPOTrainer docs](https://huggingface.co/docs/trl/main/en/grpo_trainer)
  Official docs for the trainer class used in Task 7. Use for: what every `GRPOConfig` argument does, batch-geometry rule (`batch_size × grad_accum` divisible by `num_generations`).
- [Unsloth — Reinforcement Learning / GRPO guide](https://docs.unsloth.ai/basics/reinforcement-learning-guide)
  The practical guide this notebook is built on top of. Use for: VRAM tuning knobs, `fast_inference`, `gpu_memory_utilization`.
- [OpenAI GSM8K (dataset card)](https://huggingface.co/datasets/openai/gsm8k)
  The grade-school math dataset used for training. Use for: understanding the `####` gold-answer format and why it's "verifiable."
- [willccbb's reward-function gist](https://gist.github.com/willccbb/4676755236bb08cab5f4e54a0475d6fb)
  The original source for this notebook's exact reward functions (`correctness_reward_func`, `xmlcount_reward_func`, etc). Use for: Task 5 deep dives.
- [OpenAI Spinning Up — "Part 1: Key Concepts in RL"](https://spinningup.openai.com/en/latest/spinningup/rl_intro.html)
  Clear, low-jargon primer on policy, reward, and advantage — the RL vocabulary GRPO builds on. Use for: reinforcement-learning-basics lesson.

## Wisdom (Communities)

- [r/LocalLLaMA](https://reddit.com/r/LocalLLaMA)
  Very active community for open-weight fine-tuning, including lots of Unsloth/GRPO troubleshooting threads. Use for: real VRAM/OOM problems, "does this actually work" sanity checks.
- [Unsloth Discord](https://discord.gg/unsloth)
  Official community for the exact library this notebook uses. Use for: hardware-specific setup issues, reward function design feedback.
- [Hugging Face TRL GitHub Discussions](https://github.com/huggingface/trl/discussions)
  Use for: `GRPOTrainer`/`GRPOConfig` questions once past the basics.

## Gaps

- No community identified yet specifically for reward-function design critique (a fairly niche skill) — revisit once Parth has written a custom reward function and wants feedback on it.
