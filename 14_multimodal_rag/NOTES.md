# Teaching Notes

## User preferences (stated 2026-07-16)
- **New to AI engineering** — use simple language, no unexplained jargon.
- **Prefers illustrations over text** — every concept gets a visual; keep prose to ~3 sentences per idea.
- Learning driver is **general curiosity**, not a deadline. Depth over speed is fine.
- Self-assessed **shaky on text RAG** — asked to be re-grounded before multimodal material.

## Working notes
- Lesson plan — all five built 2026-07-16 (user asked to "build all of them"):
  1. ✅ 0001 — Text RAG re-grounded on the ACME corpus (the meaning map, the 5-step pipeline)
  2. ✅ 0002 — Teaching the pipeline to see: VLM's two jobs, archivist vs expert reader (Sections 1 & 4)
  3. ✅ 0003 — Catalog cards vs a shared map: Strategy A vs B, interactive modality-gap islands (Section 5)
  4. ✅ 0004 — Two judges, one leaderboard: Strategy C, RRF step-through, reading $27M off pixels (Sections 5–7)
  5. ✅ 0005 — Grade it, then press play: recall@3 walkthrough + video timeline with timestamp citations (Sections 8–9)
  6. ✅ 0006 — Where the transcript comes from (2026-07-18, built on request): containers/tracks, waveform → spectrogram → Whisper, timestamp tokens. Answers "how does a video get a transcript?" — see learning-records/0002.
  7. ✅ 0007 — Anatomy of your first transcription run (2026-07-18): replay of the live Whisper run on Parth's own memo, base-vs-small comparison, WER intro. See learning-records/0003.
  8. ✅ 0008 — Owning the activities (2026-07-19): asked-vs-done debrief of both homework activities + speak-first/reveal-second Loom rehearsal beats. Built because activity observations were in my words, not Parth's; offered a spoken dry-run in chat as follow-up.
- Hands-on exercises work very well for Parth (took the whisper one unprompted) — offer one per lesson.
- Homework (2026-07-18): ❓ Questions #1–4 answered via "quiz me first" coaching — answers in notebook are assembled from Parth's own chat answers. Notebook fully executed twice (real recall@3: A=1.00, B=0.25→0.30, C=1.00). 🏗️ Activities: Parth delegated ("finish activities for me") — queries/gold/observations are mine, flagged as such. Loom video still on Parth; suggest reviewing activity observations before recording since those aren't in Parth's own words.
- Parth's own artifacts live in `experiments/` (memo wav, both transcripts, run_whisper.py). Pending follow-ups: compute WER once Parth supplies the true first sentence; capstone idea = full video pipeline on Parth's own longer recording.
- IMPORTANT: lessons were built in one batch, but learning happens one at a time.
  No learning records exist yet beyond the starting point — quiz results per lesson
  should drive records 0002+ before treating any lesson's content as "known".
- Reference docs: text-rag-pipeline.html (L1), three-retrieval-strategies.html (L3–5).
- Embedded real corpus images (base64): revenue chart (L1, L2, L4), latency chart (L3), keyframe kf_0005 (L5).
- Ground every lesson in the ACME corpus — the "$27M lives only in pixels" fact is the recurring hook.
- The user's notebook is `multimodal_rag.ipynb` (README calls it `multimodal_rag_vlm.ipynb` — filename on disk wins).
- Quiz answers: keep all options the same word count so formatting gives no clues.
