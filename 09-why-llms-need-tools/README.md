# 09 — Why LLMs Need Tools

**Builds on:** 04 · **Concept:** watch a smart model fail, and see why

## The idea

<div align="center">
  <a href="https://www.youtube.com/watch?v=JTQZ0TqGDlc">
    <img src="https://img.youtube.com/vi/JTQZ0TqGDlc/maxresdefault.jpg" alt="Watch the video: Why LLMs need tools" width="640">
  </a>
  <p><em>▶️ Watch the video (click the thumbnail)</em></p>
</div>

An LLM is a brain in a jar. It can reason brilliantly about what it already
learned during training, but it **cannot**:

- know anything that happened after its training cutoff (recent news, today's date)
- do exact math reliably (it predicts digits, it doesn't compute)
- read a file, search the web, or touch the real world

These are the three walls every LLM hits:

| Wall | Example it fails | Why |
|------|------------------|-----|
| **Time** | "Who won the 2025 Nobel Prize in Physics?" | Happened after training |
| **Action** | "Email this to my team" | It can only produce text |
| **Precision** | "What is 48127 × 90341?" | It guesses digits, often wrong |

## See it fail

Benchmarks like GAIA — a test set of real-world assistant questions —
show this plainly: even on the "easiest" questions, a
tool-less model solves only about a quarter of them — because most real
questions need *information the model doesn't have*.

Our demo does a tiny version. We ask the model a big multiplication and a
"what's today's date" question with no tools. It will answer confidently —
and it will often be **wrong**. That confident wrongness is the danger: the
model can't tell the difference between what it knows and what it's making up.

## The fix (the whole rest of the course)

Give the brain some hands. A **tool** is just a normal function — a
calculator, a web search, a file reader — that the model is allowed to
call. The model supplies the reasoning; the tool supplies the exact,
current, real-world result.

```
Brain (LLM)  +  Hands (Tools)  =  something that can actually do the job
```

Everything from here is about wiring those hands on safely.

## Run it

```bash
node watch-it-fail.js
```

Then check the multiplication on a real calculator. Note whether the model
was right — and how confident it sounded either way.

**Next:** [10 — what-is-tool-calling](../10-what-is-tool-calling/README.md) — how a
model that can only write text asks to run a function.
