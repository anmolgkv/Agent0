# 05 — Your First LLM Call

**Builds on:** 02, 04 · **Concept:** one request in, one answer out

## The idea

<div align="center">
  <a href="https://www.youtube.com/watch?v=HpJEA2haxYA">
    <img src="https://img.youtube.com/vi/HpJEA2haxYA/maxresdefault.jpg" alt="Watch the video: Your first LLM call" width="640">
  </a>
  <p><em>▶️ Watch the video (click the thumbnail)</em></p>
</div>

Talking to your local model is just a web request. You send a list of
**messages**; you get back one reply. No SDK, no library — Node's built-in
`fetch` is all we need.

A message has two fields:

```js
{ role: "user", content: "What is the capital of France?" }
```

`role` is who's speaking. There are three roles:

| role | who | example |
|------|-----|---------|
| `system` | the developer's instructions | "You are a helpful assistant." |
| `user` | the person | "What's the capital of France?" |
| `assistant` | the model's reply | "Paris." |

You send an array of these to Ollama's `/api/chat` endpoint, and the reply
comes back in `data.message.content`.

Today we only send a `user` message. The other two roles get their moment
soon: `assistant` when we manage history (lesson 06), `system` when we
shape behavior (lesson 07).

## The whole thing

```js
const res = await fetch("http://localhost:11434/api/chat", {
  method: "POST",
  body: JSON.stringify({
    model: "qwen3-coder:30b",
    messages: [
      { role: "user", content: "Capital of France?" }
    ],
    stream: false,           // false = wait for the full answer, then return
  }),
});
const data = await res.json();
console.log(data.message.content);   // "Paris."
```

That's the atom of everything else in this course. An agent is just this
call, made many times, with growing context.

## `stream: false` — what it means

Set `stream: false` and you get the whole answer at once (simplest to
learn with). Set it to `true` and Ollama sends the answer word-by-word as
it's typed — that's how chat UIs get the "typing" effect. We'll keep it
`false` for simplicity throughout the course.

## Run it

```bash
node first-call.js
node first-call.js "Explain gravity to a five-year-old"
```

If the request fails with `ECONNREFUSED`, Ollama isn't running — start the
Ollama app (or run `ollama serve`) and try again.

**Next:** [06 — llms-have-no-memory](../06-llms-have-no-memory/README.md) — tell the model your name, ask it back, and watch it forget. Then fix it.
