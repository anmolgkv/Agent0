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
