# Correctly identified reward design as the pipeline's real bottleneck

After the code walkthrough (Lesson 0008), Parth correctly restated the dataset mechanism in his own words (pre-existing paired question/answer records, checked per-question) and then, unprompted, asked the exact right stress-test question: "what if you don't know what good is or don't have something that represents good?" That's the actual crux limitation of GRPO/verifiable-reward RL, not a tangential concern — he arrived at it himself rather than being led there.

**Implication:** he's ready for the reward-design spectrum (exact ground truth → proxy → pairwise comparison/RLHF → LLM-judge → no signal), which is now Lesson 0009. Future sessions can treat "the dataset is pre-existing paired data" and "reward functions are hand-designed, not automatic" as established — no need to re-teach either from scratch.
