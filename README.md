# Build an AI Agent From Scratch — in JavaScript, 100% Local

A course of 49 short lessons, each teaching exactly one concept.
It goes from your first local LLM call to a multi-agent system with memory, planning,
code execution, and evaluation — running entirely on your own machine with a local LLM
(no API keys, no cloud, no cost).

**Stack:** Node.js + Ollama + `qwen3-coder:30b` (chat/tools) + `nomic-embed-text`
(embeddings, from lesson 24). Model swappable — see lesson 00.

## How to use this repo

1. Do **lesson 00** first (install Node.js and Ollama, pull the model).
2. Every lesson folder has:
   - `README.md` — the concept, explained simply
   - one or more `.js` files — small, runnable, self-contained code
3. Run any lesson with `node <file>.js` from inside its folder.
4. Lessons 16–17 (MCP) need npm packages; RAG/memory lessons need the embedding model:
   ```bash
   npm install                    # once, at this root folder (for MCP lessons)
   ollama pull nomic-embed-text   # once (for lessons 24–27 and 35)
   ```

Use a different model anytime:

```bash
MODEL=qwen3:8b node index.js
```

## The series map

### Part 0 — Setup
| # | Lesson | One concept | Video |
|---|--------|-------------|:-----:|
| 00 | [prerequisite](00-prerequisite/README.md) | Install Node, Ollama, and the model | [▶️](https://www.youtube.com/watch?v=Yw6RhNM-opE) |

### Part 1 — Foundations
| # | Lesson | One concept | Video |
|---|--------|-------------|:-----:|
| 01 | [what-is-an-ai-agent](01-what-is-an-ai-agent/README.md) | Agent = LLM + Tools + Loop | [▶️](https://youtu.be/XCPzL2Lr460) |
| 02 | [open-vs-closed-models](02-open-vs-closed-models/README.md) | Why run the model on your own machine | [▶️](https://youtu.be/STCvqbUa6aM) |
| 03 | [workflows-vs-agents](03-workflows-vs-agents/README.md) | Who decides the next step? | [▶️](https://youtu.be/h_QlZVaqK8k) |
| 04 | [what-is-context](04-what-is-context/README.md) | The model only knows what you send it | [▶️](https://youtu.be/2GOCbNSGCls) |
| 05 | [your-first-llm-call](05-your-first-llm-call/README.md) | One request in, one answer out | [▶️](https://youtu.be/HpJEA2haxYA) |
| 06 | [llms-have-no-memory](06-llms-have-no-memory/README.md) | You carry the conversation | [▶️](https://youtu.be/5RL1q5F1qqM) |
| 07 | [system-prompts](07-system-prompts/README.md) | The instructions that steer every reply | [▶️](https://youtu.be/ls3kbiFnAJ4) |
| 08 | [structured-output](08-structured-output/README.md) | Forcing the model to answer in a fixed shape | [▶️](https://youtu.be/HBKLDXuekIU) |
| 09 | [why-llms-need-tools](09-why-llms-need-tools/README.md) | Watch a smart model fail, and see why | [▶️](https://youtu.be/JTQZ0TqGDlc) |
| 10 | [what-is-tool-calling](10-what-is-tool-calling/README.md) | The model *asks* to call a function | [▶️](https://youtu.be/6IsWjv_aBgk) |
| 11 | [executing-tools](11-executing-tools/README.md) | The complete round-trip, once | [▶️](https://youtu.be/P-GlhfHYiNU) |
| 12 | [real-world-tools](12-real-world-tools/README.md) | A tool that touches the real world | [▶️](https://youtu.be/nYu7FaLpeBg) |
| 13 | [the-tool-helper](13-the-tool-helper/README.md) | Keep the function and its definition together | [▶️](https://youtu.be/l131e3KVyKw) |
