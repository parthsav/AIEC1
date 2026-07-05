<p align = "center" draggable="false" ><img src="https://github.com/AI-Maker-Space/LLM-Dev-101/assets/37101144/d1343317-fa2f-41e1-8af1-1dbb18399719"
     width="200px"
     height="auto"/>
</p>

## <h1 align="center" id="heading">Session 10: LLM Servers</h1>

| 📰 Session Sheet                                  | ⏺️ Recording                           | 🖼️ Slides                                   | 👨‍💻 Repo       | 📝 Homework                                              | 📁 Feedback                        |
| ------------------------------------------------- | -------------------------------------- | ------------------------------------------- | ------------- | -------------------------------------------------------- | ---------------------------------- |
| [LLM Servers](../00_Docs/Session_Sheets/16_LLM_Servers) |[Recording!](https://us02web.zoom.us/rec/share/HDunij9p7eCXeP_OgsRDRjTdWUqiEhDBGWrFJEn1bwWR1wz1jKX6EHXSOM45d0sC.rHiyo_znZ-R8Jh6S) <br> passcode: `D80X^YjL`| [Session 10 Slides](https://www.canva.com/design/DAG-EBu7B5A/POcowC5rDLENSPcSVpbf8g/edit?utm_content=DAG-EBu7B5A&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton) | You are here! | [Session 10 Assignment: LLM Servers](https://forms.gle/Riqvwf6KrZcCRKV86) <br><br> [Demo Day Submission (3/12)](https://forms.gle/7xyuBUn69GX4v6K98)  | [Feedback 3/5](https://forms.gle/W28QFWJXpSS4ZAR6A) |

**⚠️!!! PLEASE BE SURE TO SHUTDOWN YOUR DEDICATED ENDPOINT ON FIREWORKS AI WHEN YOU'RE FINISHED YOUR ASSIGNMENT !!!⚠️**

# Build 🏗️

In today's assignment, we'll be creating Fireworks AI endpoints, and then building a RAG application.

- 🤝 Breakout Room #1
  - Set-up Open Source Endpoint (Instructions [here](./ENDPOINT_SETUP.md)) ((This process may take 15-20min.))
  - Test Endpoint and Embeddings with the `endpoint_slammer.ipynb` notebook.

- 🤝 Breakout Room #2
  - Use the Open Source Endpoints to build a RAG LangGraph application

# Ship 🚢

The completed notebook and your RAG app/notebook!

### Deliverables

- A short Loom of either:
  - the notebook and the RAG application you built for the Main Homework Assignment; or
  - the notebook you created for the Advanced Build

# Share 🚀

Make a social media post about your final application!

### Deliverables

- Make a post on any social media platform about what you built!

Here's a template to get you started:

```
🚀 Exciting News! 🚀

I am thrilled to announce that I have just built and shipped a RAG application powered by open-source endpoints! 🎉🤖

🔍 Three Key Takeaways:
1️⃣
2️⃣
3️⃣

Let's continue pushing the boundaries of what's possible in the world of AI and question-answering. Here's to many more innovations! 🚀
Shout out to @AIMakerspace !

#LangChain #QuestionAnswering #RetrievalAugmented #Innovation #AI #TechMilestone

Feel free to reach out if you're curious or would like to collaborate on similar projects! 🤝🔥
```

# Submitting You Homework

## Main Homework Assignment

Follow these steps to prepare and submit your homework assignment:

1. Follow the instructions in `ENDPOINT_SETUP.md`
2. Replace both `model` values in `endpoint_slammer.ipynb` with the `gpt-oss` endpoint you created in Step 1
3. Run the code cells in `endpoint_slammer.ipynb`
4. Respond to the questions in the section below
5. Build a sample RAG
6. Record a Loom video reviewing what you have learned from this session

**⚠️!!! PLEASE BE SURE TO SHUTDOWN YOUR DEDICATED ENDPOINT ON FIREWORKS AI WHEN YOU HAVE FINISHED YOUR ASSIGNMENT !!!⚠️**

## Questions

### ❓ Question #1:

What is the difference between serverless and dedicated endpoints?

#### ✅ Answer:

Serverless endpoints run on shared, provider-managed infrastructure. You send requests to a public model endpoint (for example, accounts/fireworks/models/gpt-oss-20b similar to one we used in endpoint_slammer.ipynb) and pay only for the tokens or requests you use. There's no need to provision GPUs or manage infrastructure, and you can start using the model immediately. Since the underlying compute is shared with other customers, latency and throughput can fluctuate during periods of high demand. On the plus side, there are no idle infrastructure costs.

Dedicated (on-demand) endpoints reserve compute exclusively for your deployment, for example by creating a deployment with `firectl create deployment` and configuring `min-replica` and `max-replica`. This gives you dedicated capacity, more consistent latency, predictable performance under concurrent load, and control over how your deployment scales. The trade off is cost: you pay for the reserved replicas even when they're idle, so it's important to shut down the deployment when you're finished to avoid unnecessary charges.


### ❓ Question #2:

Why is it important to consider token throughput and latency when choosing an LLM for user-facing applications?

#### ✅ Answer:
User facing applications are evaluated in real time so responsiveness is necessary. User expects answers to beging stream within few seconds as supposed to minutes. Latency which means the time taken for first token and total response time has a direct impact on the user experience. If we have high latency it makes our chatbots, search and our application in general feel slow or unreliatble increasing the likelihood of people abondoning our app.

**Token throughput**, measured in tokens generated per second, determines how quickly a complete response is delivered and how many users an endpoint can handle simultaneously. Higher throughput allows responses to finish faster and supports more concurrent requests. Lower throughput, on the other hand, leads to longer wait times and reduces the number of requests an endpoint can serve before requests begin queueing or timing out, as demonstrated by the `endpoint_slammer.ipynb` stress test.

When choosing an LLM endpoint, it's important to balance model quality with performance. A highly capable but slower model may be perfectly suitable for offline or batch processing, where response time isn't critical. For interactive applications, however, low latency and sufficient throughput are essential to deliver a responsive experience under expected user traffic.


## Activity 1: RAGAS Evaluation with Cost Analysis

Use RAGAS to evaluate your open-source Fireworks AI powered RAG app against an OpenAI `gpt-4.1-mini` powered equivalent. Compare retrieval quality, answer faithfulness, and end-to-end accuracy across both providers.

Additionally, instrument both pipelines with **LangSmith** to capture token usage and cost per query. Use LangSmith's tracing and cost dashboards to compare the total cost of running each provider at scale. Include your evaluation results, cost breakdown, and analysis in your Loom video.

#### ✅ Answer

**Setup**: `app/rag.py` was parameterized by `provider` (`"fireworks"` vs `"openai"`) so the same retrieve→generate graph runs against either stack — Fireworks' `gpt-oss-20b` + `qwen3-embedding-8b`, or OpenAI's `gpt-4.1-mini` + `text-embedding-3-small`. The test set (4 human-reviewed Q&A pairs) was reused from `05_Synthetic_Data_Generation_for_RAG_Evals`, whose source PDF is byte-identical (same MD5) to this project's `cat-health-guide.pdf`. See `ragas_provider_eval.ipynb` for the full run.

**RAGAS results** (judge fixed to OpenAI `gpt-4.1-mini` for both, so the comparison isolates the pipeline, not the grader):

| Metric | Fireworks (gpt-oss-20b) | OpenAI (gpt-4.1-mini) |
|---|---|---|
| context_precision | 0.979 | 0.979 |
| context_recall | 0.750 | 0.938 |
| faithfulness | 0.599 | 1.000 |
| answer_correctness | 0.450 | 0.559 |

Retrieval quality is nearly identical (same chunking/retriever code, only the embedding model differs) — both models are looking at essentially the same evidence. The real gap is faithfulness — `gpt-oss-20b`'s answers drift from the retrieved context noticeably more than `gpt-4.1-mini`'s do, even when the correct context was retrieved. `answer_correctness` is low for both in absolute terms (RAGAS penalizes wording that doesn't closely match the reference answer, even when the content is right), but the ~0.11 gap between them here is wide enough to not dismiss as noise the way it was at n=4 in an earlier run.

**Cost breakdown** (pulled from LangSmith via API, not the UI — token counts and, for OpenAI, cost are LangSmith's own numbers; Fireworks priced manually since LangSmith has no built-in pricing for it. Each project now holds 8 accumulated runs across two notebook executions — figures below use only the 4 most recent runs per project, matching the RAGAS scores above):

| | Fireworks (gpt-oss-20b) | OpenAI (gpt-4.1-mini) |
|---|---|---|
| Avg. generation cost / query | $0.00058 | $0.00186 |
| Rate used | $0.07 / $0.30 per 1M in/out tokens | LangSmith's built-in OpenAI pricing |
| One-time indexing cost (42 chunks, ~24.2k tokens, embedded once) | $0.0024 (`qwen3-embedding-8b` @ $0.10/1M) | $0.0005 (`text-embedding-3-small` @ $0.02/1M) |
| Projected at 10,000 queries/day for 30 days (generation only) | ~$172.50/mo | ~$559.35/mo |

OpenAI's `gpt-4.1-mini` costs about **3.2x more per query** than Fireworks' `gpt-oss-20b` for generation in this test, and its embedding model is actually *cheaper* per token than Fireworks' — the cost gap is almost entirely in chat generation pricing, not embeddings.

**Analysis**: at this traffic volume, the open-source route saves roughly $387/month over OpenAI, but comes with a real, measured drop in faithfulness (answers straying from the source guide more often) and a real gap in answer correctness. For a cat-health information product, unfaithful or incorrect answers are a bigger risk than in a lower-stakes domain — so the 3x cost premium is likely justified here to keep answers grounded in the veterinary guide. For a use case where occasional drift is more tolerable, Fireworks' cost advantage would be the deciding factor. This test set (n=4) is still small — a larger, harder eval set (adversarial questions, multi-hop questions) would be the next step before committing to either provider in production.

**Two build notes worth keeping**:
- The first attempt at splitting LangSmith projects by reassigning `os.environ["LANGSMITH_PROJECT"]` mid-run silently failed — both providers' traces landed in one project, because LangSmith resolves the project once per process and doesn't re-read the env var after the first trace. Fixed by wrapping each provider's run in `langsmith.tracing_context(project_name=...)`, which scopes the project correctly per call.
- Re-running the same notebook produced noticeably different scores the second time (faithfulness moved from 0.457→0.599, answer_correctness from 0.393/0.425→0.450/0.559) — the Fireworks branch doesn't pin `temperature`, so its generations vary run to run, and the RAGAS judge itself is an LLM call with its own sampling variance. Neither run is "the" answer; both point the same direction (OpenAI more faithful and more correct, Fireworks cheaper), but exact numbers should be read as one sample, not a fixed ground truth — pin `temperature=0` on the Fireworks branch too if you want tighter run-to-run repeatability.

## Advanced Activity: Local Models

Swap out the Fireworks AI endpoints for **locally-running open-source models** using [Ollama](https://ollama.com/) or another local inference server of your choice. Run both your embedding model and your chat model locally, and rebuild the RAG pipeline on top of them.

- Compare quality and latency between the local setup and your Fireworks AI hosted endpoint.
- Reflect: what are the trade-offs of local models vs. managed endpoints in a production setting?

Include your findings and a demo in your Loom video.
