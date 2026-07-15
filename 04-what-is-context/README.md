# 04 — What Is Context?

**Builds on:** 01 · **Concept:** the model only knows what you send it

## The idea

<div align="center">
  <a href="https://www.youtube.com/watch?v=2GOCbNSGCls">
    <img src="https://img.youtube.com/vi/2GOCbNSGCls/sddefault.jpg" alt="Watch the video: What is context?" width="640">
  </a>
  <p><em>▶️ Watch the video (click the thumbnail)</em></p>
</div>

An LLM has **no memory and no senses**. In each request, the only thing it
knows is the text you hand it. That bundle of text is called the **context**.

> Think of the model as a brilliant expert locked in a room with no windows,
> no phone, and total amnesia. Every time you want an answer, you slide a
> single sheet of paper under the door. Whatever is on that paper is
> *everything* it knows for that answer. Slide a blank page and ask "what did
> we discuss?" — it has no idea. You never talked, as far as it can tell.

That sheet of paper — the context — usually contains:

- a **system prompt** (instructions: "you are a helpful assistant")
- the **conversation so far** (what the user said, what the model replied)
- **tool results** (a web search's output, a file's contents)
- the **current question**

## Why this is *the* central idea of the whole course

Almost every agent failure is a context failure. The model gave a wrong
answer? Usually the right information wasn't on the paper. Building an
agent is really the craft of **putting the right information on that sheet
at the right moment**. This discipline is called *context engineering*, and
it's the thread running through the whole course.

Two rules follow from the locked-room picture:

1. **If it's not in the context, the model can't use it.** No memory of
   yesterday. No knowledge of a file you didn't paste. No awareness of
   right now unless a tool fetched it.
2. **More is not better.** A giant messy page buries the important line.
   Models literally get *worse* when the context is bloated with noise.
   Good agents keep the page focused. (There's also a hard size limit —
   the *context window* — but noise hurts quality long before you hit it.
   Lesson 31 deals with running out of room.)

## See the locked room

```bash
node the-locked-room.js
```

It sends the model two versions of the same question — one with the needed
fact in context, one without — and you watch the answer flip from confident
nonsense to correct.

**Next:** [05 — your-first-llm-call](../05-your-first-llm-call/README.md) — enough theory: send your first real request to the model with one `fetch` call.
