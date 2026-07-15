# 01 — What Is an AI Agent?

**Builds on:** 00 · **Concept:** Agent = LLM + Tools + Loop

## The idea

<div align="center">
  <a href="https://www.youtube.com/watch?v=XCPzL2Lr460">
    <img src="https://img.youtube.com/vi/XCPzL2Lr460/maxresdefault.jpg" alt="Watch the video: What is an AI agent?" width="640">
  </a>
  <p><em>▶️ Watch the video (click the thumbnail)</em></p>
</div>

A chatbot answers questions. An **agent** gets things done.

Ask a chatbot "what's the weather in Paris?" and it can only guess from old
training data. An agent *checks a weather service*, reads the result, and
answers with today's actual weather. The difference is not intelligence —
it's the ability to **take actions** and to **keep going** until the job is done.

Every agent, from ChatGPT's research mode to coding assistants like Claude
Code and Cursor, is made of the same three parts. (**LLM** = large language
model — the text-in, text-out engine behind chatbots like ChatGPT; the model
you installed in lesson 00 is one.)

| Part | Role | Human analogy |
|------|------|---------------|
| **LLM** | Decides what to do next | The brain |
| **Tools** | Interact with the world (search, calculate, read files) | The hands |
| **Loop** | Repeat until the goal is reached | Persistence |

## The loop, on a napkin

```
        ┌─────────────────────────────┐
        │                             ▼
   User asks ──► LLM thinks ──► "Do I need a tool?"
                     ▲                │
                     │          yes   │   no
                 run tool ◄───────────┘    └──► final answer
```

1. The LLM reads the question and everything gathered so far.
2. If it needs information or an action, it picks a **tool**.
3. The tool runs; its result gets added to what the LLM can see.
4. Back to step 1 — until the LLM decides it can answer.

That's it. Twenty lessons from now, our finished agent is still just this
diagram — written carefully in JavaScript.

## Why a loop and not a fixed script?

Because you can't predict how many steps a task needs. "What's 2+2" takes
zero tool calls. "Compare the populations of the three largest cities in
Japan" might take four searches. The loop lets the *model* decide, at
runtime, how much work the task needs.

## Try it yourself (thought exercise — no code yet)

Take a task you did today and split it into LLM / Tools / Loop:
- "Book a dinner table" → decide cuisine (brain), search restaurants +
  call the booking site (hands), retry when the 7pm slot is full (loop).

**Next:** [02 — open-vs-closed-models](../02-open-vs-closed-models/README.md) — why we run the model on our own machine instead of calling a cloud API.
