# Multimodal RAG Resources

## Knowledge

- [Article: "Embeddings: What they are and why they matter" — Simon Willison](https://simonwillison.net/2023/Oct/23/embeddings/)
  The clearest beginner explanation of embeddings as "coordinates in meaning space", with visuals and a talk video. Use for: grounding intuition before anything vector-related. **Primary source for Lesson 0001.**
- [Docs: LangChain — Multimodality (messages with images)](https://python.langchain.com/docs/concepts/multimodality/)
  How images travel inside chat-model messages as content blocks. Use for: the `image_block` helper in notebook Cell 4.1.
- [Paper: "Learning Transferable Visual Models From Natural Language Supervision" (CLIP) — Radford et al., OpenAI 2021](https://arxiv.org/abs/2103.00020)
  The model behind Strategy B: text and images embedded into one shared space. Use for: understanding what CLIP can (find) and cannot (read) do.
- [Docs: Qdrant — Quickstart & concepts](https://qdrant.tech/documentation/quickstart/)
  The vector database used throughout the notebook (`:memory:` mode). Use for: collections, points, cosine distance, filters.
- [Paper: "Reciprocal Rank Fusion outperforms Condorcet..." — Cormack, Clarke & Buettcher, 2009](https://plg.uwaterloo.ca/~gvcormac/cormacksigir09-rrf.pdf)
  The 2-page original RRF paper; the formula in notebook Cell 5.4 comes straight from it. Use for: Strategy C's fusion step.

- [Paper: "Mind the Gap: Understanding the Modality Gap in Multi-modal Contrastive Representation Learning" — Liang et al., NeurIPS 2022](https://openreview.net/forum?id=S7Evzt9uit3)
  The definitive study of why text and images form separate islands in CLIP space. Use for: Lesson 3's modality-gap claim; Figure 1 is the picture to show.
- [Article: "OpenAI CLIP Model Explained" — Lightly](https://www.lightly.ai/blog/clip-openai)
  Visual, engineer-level CLIP walkthrough. Use for: Lesson 3's primary source; how contrastive training builds the shared map.
- [Wikipedia: Evaluation measures (information retrieval)](https://en.wikipedia.org/wiki/Evaluation_measures_(information_retrieval))
  Where recall@k sits among precision, MRR, nDCG. Use for: Lesson 5; only the Recall/Precision sections needed.
- [Repo: openai/whisper — Robust Speech Recognition via Large-Scale Weak Supervision](https://github.com/openai/whisper)
  The speech-to-text model behind notebook Cell 9.2's commented line; README has the encoder/decoder diagram. Use for: Lesson 6; how audio becomes a timestamped transcript. Paper: [arXiv:2212.04356](https://arxiv.org/abs/2212.04356).

## Wisdom (Communities)

- The AIEC cohort itself (breakout rooms + community channel)
  Parth is already enrolled; the notebook is built for discussion in breakout rooms. Use for: comparing Activity #1/#2 observations with other learners.
- [r/LangChain](https://reddit.com/r/LangChain)
  Active practitioner community for the exact stack in this notebook. Use for: "is this how people really do it?" questions.

