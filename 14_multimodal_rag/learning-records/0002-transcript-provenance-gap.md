# Gap found: dataset conveniences read as magic (transcript provenance)

On 2026-07-18 Parth asked how a raw video "gets" a transcript — lesson 0005 (and the notebook) start from a shipped `fy2024_review_transcript.json`, and the ASR step exists only as a commented Whisper line in Cell 9.2. Verified while answering: the demo .mp4 has **no audio track**, so speech-to-text genuinely never runs in this notebook. Lesson 0006 was built to close the gap (containers/tracks → waveform → spectrogram → Whisper encoder/decoder → timestamped segments).

**Evidence:** Unprompted, precise question ("what if I just have audio and video? how does it work internally?") — good sign: Parth is probing *provenance* of pipeline inputs, not just accepting them.

**Implications:** Audit the other dataset conveniences for the same illusion before assuming understanding: keyframes also ship pre-extracted (Cell 9.3 falls back to them), and the charts regenerate via matplotlib (Cell 3.1). When teaching any pipeline, explicitly flag "in this demo X is shipped; in real life X comes from Y". Offered a hands-on Whisper-on-own-voice-memo exercise in lesson 0006 — if taken, that's the first real-world skill transfer of this workspace.
