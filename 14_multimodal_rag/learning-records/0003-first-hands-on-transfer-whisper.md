# First real-world transfer: ran Whisper on own voice memo, spotted accuracy limits

On 2026-07-18 Parth took lesson 0006's optional exercise: recorded a ~19s voice memo and we ran Whisper `base` on it end-to-end (afconvert → wav → segments JSON). Unprompted, Parth then flagged that "the transcription is not totally accurate" — a correct observation (the `base` model garbled the opening phrase). We reran with `small`, which fixed the later segments and merged choppy ones; lesson 0007 captures the comparison. Artifacts persisted in `experiments/`.

**Evidence:** Completed the exercise on own initiative; independently evaluated output quality rather than accepting it. Notably, the memo itself states the mission in Parth's own words: "once I know it, I should be able to timestamp everything I want in a video."

**Implications:** (1) Hands-on exercises land — offer one per lesson going forward. (2) WER was introduced but not yet practiced; if Parth supplies the true sentence, compute WER together as the follow-up (mirrors the gold-set pattern from recall@3 — good spaced retrieval of lesson 0005). (3) Parth's stated goal is video timestamping specifically — future sessions could run the full lesson-5 pipeline on Parth's own longer recording as the capstone.
