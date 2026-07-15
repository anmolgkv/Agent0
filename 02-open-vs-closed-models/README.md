# 02 — Open vs Closed Models (and Why We Go Local)

**Builds on:** 01 · **Concept:** why run the model on your own machine

## The idea

<div align="center">
  <a href="https://www.youtube.com/watch?v=STCvqbUa6aM">
    <img src="https://img.youtube.com/vi/STCvqbUa6aM/maxresdefault.jpg" alt="Watch the video: Open vs closed models" width="640">
  </a>
  <p><em>▶️ Watch the video (click the thumbnail)</em></p>
</div>

Every AI model is either **closed** or **open**.

| | Closed models | Open-weight models |
|---|---|---|
| Examples | GPT, Claude, Gemini | Qwen, Llama, Mistral, DeepSeek |
| How you use it | Send text to a company's servers over the internet | Download the model, run it on your computer |
| Cost | Pay per use, need an API key | Free to run, you own the hardware |
| Privacy | Your data leaves your machine | Your data never leaves |
| Works offline | No | Yes |

("Weights" are the billions of numbers a model learns during training —
the file that *is* the model. Open-weight means that file is published,
so anyone can download it and run it.)

Most tutorials reach for closed models (GPT, Claude). **We use open
models instead** — because for *learning*, local models are perfect:

- **No cost.** Run the loop a thousand times while debugging; it's free.
- **No sign-up.** No keys to manage, nothing to leak in a demo.
- **It demystifies AI.** When the model lives in a file on your disk and
  answers with your laptop's own chips, it stops feeling like magic.
  Unplug your Wi-Fi and it still answers.

The trade-off: closed models are still a bit smarter. But everything you
learn here transfers directly — swapping to a cloud model later is a
one-line change (the request format is nearly identical).

## Ollama = the easy button for open models

Running an open model used to mean wrestling with Python, CUDA, and
gigabytes of config. **Ollama** turns it into one command:

```bash
ollama pull qwen3-coder:30b   # download once
ollama run  qwen3-coder:30b   # chat
```

Behind the scenes Ollama exposes a small web server on your machine at
`http://localhost:11434`. Our JavaScript code talks to *that*. So from
now on, "call the LLM" just means "send an HTTP request to localhost."

## See what you own

```bash
node list-models.js
```

It lists every model currently on your machine.

**Next:** [03 — workflows-vs-agents](../03-workflows-vs-agents/README.md) — when a plain script beats an agent, and the one question that tells you which to build.
