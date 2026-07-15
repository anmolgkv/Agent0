# Prerequisites

## The idea

<div align="center">
  <a href="https://www.youtube.com/watch?v=Yw6RhNM-opE">
    <img src="https://img.youtube.com/vi/Yw6RhNM-opE/maxresdefault.jpg" alt="Watch the video: prerequisite — the idea" width="640">
  </a>
  <p><em>▶️ Watch the video (click the thumbnail)</em></p>
</div>


To build an AI agent on your own machine you need exactly three things:

1. **Node.js** — the program that runs JavaScript outside a browser.
2. **Ollama** — a free app that downloads and runs AI models locally.
   Think of it as an app store for AI models: one command downloads a
   model, one command runs it.
3. **A model** — we use `qwen3-coder:30b`, a free open-weight model that is
   good at following instructions and calling tools. ("Open-weight" means
   the model file itself is free to download — lesson 02 explains why we
   want that.)

No API keys. No credit card. No cloud account. Everything in this course
runs on your laptop, even offline.

## Install steps

### 1. Node.js (version 20 or newer)

Download from <https://nodejs.org> and install. Verify:

```bash
node --version   # should print v20.x or higher
```

### 2. Ollama

Download from <https://ollama.com> and install. Verify:

```bash
ollama --version
```

### 3. The model

```bash
ollama pull qwen3-coder:30b
```

This downloads ~19 GB once. It runs comfortably on a machine with
**24 GB+ of RAM** (Apple Silicon Macs handle it well).

**Smaller machine?** Use a smaller tool-capable model instead — everything
in this course still works:

```bash
ollama pull qwen3:8b        # ~5 GB, needs ~8 GB RAM
```

Then run any lesson with `MODEL=qwen3:8b node index.js`.

### One more model (needed from lesson 24 onward)

The RAG and memory lessons (24–27 and 35) turn text into numbers to compare
meaning. That needs a small, dedicated **embedding model**:

```bash
ollama pull nomic-embed-text   # ~274 MB
```

You can pull it now or wait until lesson 24 — the lessons remind you.

### 4. Smoke test

```bash
ollama run qwen3-coder:30b "Say hello in five words"
```

If you get a reply, you have a working AI model on your machine.

## Run the checker

```bash
node check.js
```

It confirms Ollama is running and the model is downloaded.

**Next:** [01 — what-is-an-ai-agent](../01-what-is-an-ai-agent/README.md) — the three parts every agent is made of, and why a loop is the secret ingredient.
