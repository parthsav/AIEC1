"""Lesson 6, for real: your voice memo -> timestamped segments (Whisper 'base')."""
import wave, json
import numpy as np
import whisper

# Step ① — sound is just a list of numbers (16,000 per second)
with wave.open("/private/tmp/claude-501/-Users-parth-AIEC1-14-multimodal-rag/07b04095-740a-410f-915d-92b7db18df53/scratchpad/memo_16k.wav") as w:
    audio = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768.0
print(f"① your memo as numbers: {len(audio):,} samples ({len(audio)/16000:.1f}s)  first few: {np.round(audio[8000:8004], 3).tolist()}")

# Steps ②–④ — spectrogram, encoder looks, decoder types with clock marks (all inside this call)
model = whisper.load_model("base")   # first run downloads ~140 MB to ~/.cache/whisper
result = model.transcribe(audio, fp16=False)

# Step ⑤ — the segments, same shape as data/video/fy2024_review_transcript.json
print("\n⑤ your transcript segments:")
for s in result["segments"]:
    print(f"  [{s['start']:5.1f}s – {s['end']:5.1f}s]  {s['text'].strip()}")

out = "/private/tmp/claude-501/-Users-parth-AIEC1-14-multimodal-rag/07b04095-740a-410f-915d-92b7db18df53/scratchpad/memo_transcript.json"
json.dump({"segments": [{"start": s["start"], "end": s["end"], "text": s["text"].strip()}
                        for s in result["segments"]]}, open(out, "w"), indent=2)
print(f"\nsaved: {out}")
