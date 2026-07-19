# Loom script — Session 14 activities walkthrough (~3:40)

> Delivery notes: these are beats, not lines to read. Glance at the bold cue, look back
> at the screen, and say it your way. Pause while you scroll — silence during scrolling
> reads as confidence. Total ≈ 510 words ≈ 3:40 at conversational pace.

---

## Part 1 — What Session 14 taught (~70 sec)
**SCREEN: notebook title, then scroll slowly to Section 7's Q&A output**

- "Hi — this is my Session 14 walkthrough: multimodal RAG with vision-language models."
- "The core problem this session solves: regular RAG can only search **text**. The embedding
  model that places documents on the meaning map is blind to images — but in this dataset,
  the key facts, like ACME's **$27M Q4 revenue**, exist *only inside chart images*."
- "The notebook solves it three ways. **Strategy A**: a vision model writes a searchable
  caption for every chart, once, at ingestion. **Strategy B**: CLIP embeds the actual
  pixels into the same space as text, so a text query can match an image directly.
  **Strategy C**: keep two separate stores — the best text embedder for text, CLIP for
  images — and merge the two ranked lists with reciprocal rank fusion."
- "And whichever strategy *finds* the image, at answer time we hand the model the **actual
  pixels**, so it reads exact numbers off the chart."
- **[point at the Section 7 output]** "Here it answers 'Q4, $27 million', citing the revenue
  chart — that number appears in no text file. Retrieval found the chart; the model read it."

## Part 2 — Activity #1: probing the strategies (~80 sec)
**SCREEN: scroll to the 🏗️ Activity #1 code cell, then its output**

- "For Activity 1 I probed the three strategies with my own queries — one visual, one factual."
- "My visual query: *'a pie chart showing how our spending is split into slices'* — notice it
  never says 'cloud' or 'cost'. My factual one: *'how many engineers do we have compared to
  other departments?'*"
- **[show the rankings]** "Strategy A nailed both — right chart at #1 each time — because the
  captions written at ingestion contained exactly what I asked about: the words 'pie chart',
  and the headcount numbers."
- "The surprise was Strategy B. I expected pie-chart phrasing to be CLIP's best case — a pie
  chart is visually unmistakable. Instead, **B returned zero images for both queries**."
- "That's the **modality gap**: my query is text, so it lands near text in the shared space —
  no matter how visual the wording is."
- "Strategy C recovered the charts at #2: its separate image store lets a chart earn an honest
  rank among images, and RRF merges by *placement* — placements are comparable even when
  scores aren't."

## Part 3 — Activity #2: growing the eval (~55 sec)
**SCREEN: scroll to the 🏗️ Activity #2 cell and the recall printout**

- "Activity 2 was about the evaluation. I added two new gold questions to the answer key:
  one answerable from **text** — what the cost review recommended — and one answerable only
  from **pixels** — which quarter had the *lowest* revenue."
- **[point at the table]** "A and C stayed perfect at 1.00. B moved from 0.25 to 0.30 — with
  ten questions, that's exactly **one** new hit. It got the text question and missed the
  image one."
- "So B's score went up without B getting any better — I just added a question shaped like
  the ones it can already do. That's the real lesson: **an eval is only as honest as its
  gold set**."

## Part 4 — Close (~20 sec)
**SCREEN: zoom out to the whole notebook or the recall table**

- "So the activities weren't really about my two queries. Activity 1 taught me to never accept
  a ranking I can't explain from the system's design. Activity 2 taught me to never accept a
  score whose questions I haven't seen. Thanks for watching."

---

*Rehearse with lesson 8's beat cards (speak first, reveal second), then record in one take —
a small stumble sounds more real than a perfect read.*
