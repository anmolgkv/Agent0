# 07 — System Prompts: Shaping Behavior

**Builds on:** 05 · **Concept:** the instructions that steer every reply

## The idea

<div align="center">
  <a href="https://www.youtube.com/watch?v=ls3kbiFnAJ4">
    <img src="https://img.youtube.com/vi/ls3kbiFnAJ4/maxresdefault.jpg" alt="Watch the video: System prompts" width="640">
  </a>
  <p><em>▶️ Watch the video (click the thumbnail)</em></p>
</div>

The **system prompt** is a message with `role: "system"` that sits at the
front of the context and quietly governs how the model behaves for the
whole conversation. The user doesn't see it; the model always does.
In code it's just element 0 of the `messages` array from lesson 06 —
it stays put while the conversation grows behind it.

Same question, two different system prompts:

```
system: "You are a pirate. Answer in pirate slang."
user:   "What is the capital of France?"
→ "Arrr, that be Paris, matey!"

system: "You answer in exactly one word."
user:   "What is the capital of France?"
→ "Paris"
```

The user message never changed. The system prompt reshaped the output.

## What a good agent system prompt actually contains

For chatbots people write personalities. For **agents**, the system prompt
is a rulebook. Production agents (like Claude's) use it for four jobs:

1. **Identity** — who the agent is and what it can do.
2. **Output format & style** — "be concise," "answer in JSON," etc.
3. **Boundaries** — what it must *not* do (the easiest part to forget).
4. **Tool policy** — when to use tools vs answer directly.

## The single most important line for agents

A chatbot asks permission ("Want me to search for that?"). An agent
**acts**. One line flips a model from chatbot to agent:

```
When the user's intent is clear, use your tools and act immediately —
do not ask for confirmation. Only ask when the request is genuinely ambiguous.
```

That "act, don't ask" instruction is what makes an agent feel like it's
working *for* you instead of chatting *with* you. We'll lean on it once
our agent has real tools to act with, later in the course.

## Run it

```bash
node system-prompts.js
```

Watch one question run through several system prompts and come out
completely different each time.

**Next:** [08 — structured-output](../08-structured-output/README.md) — making the model answer in JSON your code can parse, instead of free-form prose.
