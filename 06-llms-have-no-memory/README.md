# 06 — LLMs Have No Memory

**Builds on:** 05 · **Concept:** you carry the conversation

## The idea

<div align="center">
  <a href="https://www.youtube.com/watch?v=5RL1q5F1qqM">
    <img src="https://img.youtube.com/vi/5RL1q5F1qqM/maxresdefault.jpg" alt="Watch the video: LLMs have no memory" width="640">
  </a>
  <p><em>▶️ Watch the video (click the thumbnail)</em></p>
</div>

Each API call is a fresh start. The model forgets everything the instant
it replies. If chat apps *feel* like they remember, it's because the app
quietly re-sends the whole conversation every time.

Watch it fail. (`ask()` is a tiny helper that wraps lesson 05's `fetch`
call: pass a messages array, get the reply text back.)

```js
await ask([{ role: "user", content: "My name is Anmol." }]);
// → "Nice to meet you, Anmol!"

await ask([{ role: "user", content: "What's my name?" }]);
// → "I don't have that information." 😳
```

Second call, brand new context (remember the locked room from lesson 04).
The name was on the *first* sheet of paper, not the second.

## The fix: send the history back

Keep a growing `messages` array. After each exchange, push both what the
user said **and** what the assistant replied. Then send the whole array
next time.

```js
const messages = [];

messages.push({ role: "user", content: "My name is Anmol." });
const reply1 = await ask(messages);
messages.push({ role: "assistant", content: reply1 });  // remember our own reply

messages.push({ role: "user", content: "What's my name?" });
const reply2 = await ask(messages);   // now the name is in context → "Anmol"
```

Pushing the assistant's own reply matters too: skip it, and the model sees
a conversation where it never answered — it may repeat itself or contradict
what it "said" before.

That's the entire trick behind every chatbot's "memory." There is no
memory — just a list you keep re-sending.

## Why this matters for agents

An agent's context grows fast: user question, the model's tool requests,
tool results, more reasoning. **All of it** lives in this same `messages`
array. Managing that array well is most of what building an agent *is*.
Later we'll wrap it in a proper structure, but it's always this list
underneath.

## Run it

```bash
node no-memory.js       # shows the failure, then the fix, back to back
```

**Next:** [07 — system-prompts](../07-system-prompts/README.md) — one hidden message at the front of the context that steers every reply the model gives.
