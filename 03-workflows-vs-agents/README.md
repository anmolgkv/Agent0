# 03 — Workflows vs Agents

**Builds on:** 01 · **Concept:** who decides the next step?

## The idea

<div align="center">
  <a href="https://www.youtube.com/watch?v=h_QlZVaqK8k">
    <img src="https://img.youtube.com/vi/h_QlZVaqK8k/maxresdefault.jpg" alt="Watch the video: Workflows vs agents" width="640">
  </a>
  <p><em>▶️ Watch the video (click the thumbnail)</em></p>
</div>

Not everything needs an agent. There are two ways to build with an LLM,
and the difference is **who is in control of the steps**.


## The one question that decides it

> **Can I write down the steps in advance?**
>
> - **Yes** → build a workflow. It's cheaper, faster, and more reliable.
> - **No** (the steps depend on what you discover along the way) → build an agent.

Agents cost more (many LLM calls) and are less predictable. Use them only
when the flexibility is worth it. A weather lookup doesn't need an agent.
"Research this topic across many sources" does.

### Workflow — *the developer* decides the path

You write the steps in code. The LLM just fills in specific blanks.

```
Step 1 (you): get the customer email
Step 2 (LLM): classify it as "billing" or "tech support"
Step 3 (you): route to the matching team
```

Predictable. Same input → same path every time. Great when you already
know the procedure.

### Agent — *the LLM* decides the path

You hand the LLM a goal and some tools. It figures out the steps itself,
in whatever order and however many it takes.

```
Goal: "How far could Kipchoge (the marathon world-record holder) run
       in the time it takes to reach the Moon?"
LLM decides: search his pace → search Moon distance → calculate → answer
(You never wrote those steps. The model chose them.)
```

Flexible. Handles tasks you couldn't script in advance.


## The levels of control

Real systems sit on a spectrum. As you move from left to right, the LLM
takes over more of the decisions:

```
 Plain code → Single LLM call → Chain → Router → Tool use → Multi-step loop
 └──── workflow (you drive) ────┘        └──── agent (model drives) ────┘
```

Quick vocabulary for the middle steps: a **chain** is several LLM calls in
a fixed sequence you wrote; a **router** is one LLM call that picks which
branch of your code runs next; **tool use** lets the model request an
action instead of just producing text.

This course builds toward the right-hand end: a true multi-step agent.
But knowing the left end exists keeps you from over-engineering.

## Demo

```bash
node workflow.js
```

It shows the *same question* handled two ways: a rigid router (workflow)
and a free-form agent-style prompt. Watch who's holding the steering wheel.

**Next:** [04 — what-is-context](../04-what-is-context/README.md) — the one thing that limits every LLM: it only knows what you send it.
