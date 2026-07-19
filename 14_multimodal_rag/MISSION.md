# Mission: Multimodal RAG — deeply understood

## Why
Parth is new to AI engineering and genuinely curious about one question: **how can a machine take a plain-English question and find the right *image* — then read the answer off its pixels?** The Session 14 notebook (`multimodal_rag.ipynb`) is the vehicle, but the goal is durable understanding, not homework completion. Success means Parth could rebuild the ideas from scratch, not just re-run cells.

## Success looks like
- Can explain text RAG (chunk → embed → store → retrieve → answer) in their own words, with no notes
- Can explain why a text question retrieving a chart image is *hard*, and describe the three strategies (caption→text, unified CLIP, separate stores + RRF) with their tradeoffs
- Can point at any cell in `multimodal_rag.ipynb` and say what job it does and why it's there
- Can explain the "two jobs of the VLM" (parser at ingestion vs. reader at query time) and why CLIP alone can't read "$27M" off a chart
- Runs the notebook end to end and predicts what each section will print *before* running it

## Constraints
- New to AI engineering — no assumed jargon; every new term needs an analogy first
- Strong preference for **illustrations and animations over text** (stated at kickoff)
- Text RAG foundations are shaky — re-ground before building on them
- No deadline pressure (curiosity-driven), so depth beats speed

## Out of scope
- Production concerns (scaling, deployment, cost optimization) beyond the notebook's Section 10 recap
- Training or fine-tuning models (we only *use* VLMs and CLIP)
- Other AIEC sessions' material, except text RAG which we re-ground as a foundation
