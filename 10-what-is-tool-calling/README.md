# 10 — What Is Tool Calling?

**Builds on:** 08, 09 · **Concept:** the model *asks* to call a function

## The idea

<div align="center">
  <a href="https://www.youtube.com/watch?v=6IsWjv_aBgk">
    <img src="https://img.youtube.com/vi/6IsWjv_aBgk/maxresdefault.jpg" alt="Watch the video: What is tool calling?" width="640">
  </a>
  <p><em>▶️ Watch the video (click the thumbnail)</em></p>
</div>

Here's the part that surprises people: **the model never runs your code.**
It can't. It only outputs text. So tool calling works like passing notes.

> The model is still the expert in the locked room. You slide in a note
> listing the tools available ("there's a `calculator(a, b)` out here").
> When the model wants one, it can't reach out and use it — it writes a
> note back: *"Please run `calculator` with a=1234, b=5678."* You (your
> program) run it, then slide the result back in. The model reads the
> result and continues.

So there are two different jobs:

- **The model decides** *which* tool and *what* arguments. (Just structured
  output — lesson 08 — under a new name.)
- **Your program executes** the tool and returns the result.

## What you send: a tool definition

You describe each tool as a JSON object — its name, what it's for, and its
arguments. This is the "note" listing what's available:

```js
{
  type: "function",
  function: {
    name: "calculator",
    description: "Multiply two numbers.",
    parameters: {
      type: "object",
      properties: { a: { type: "number" }, b: { type: "number" } },
      required: ["a", "b"],
    },
  },
}
```

The `parameters` block is the same JSON Schema from lesson 08 — a
fill-in-the-blank form for the arguments.

The `description` matters enormously — it's how the model knows *when* to
reach for this tool. Vague description, wrong tool at the wrong time.

## What you get back: a tool call

Instead of prose, the reply contains a `tool_calls` array:

```json
{
  "role": "assistant",
  "content": "",
  "tool_calls": [
    { "id": "call_1", "function": { "name": "calculator", "arguments": { "a": 1234, "b": 5678 } } }
  ]
}
```

The model *asked*. It hasn't computed anything. Lesson 11 does the running.

> **Local-model note:** Ollama gives you `arguments` already parsed as an
> object. (Cloud APIs like OpenAI hand it back as a JSON string you must
> `JSON.parse`.) Small difference, worth knowing when you port later.

## Run it

```bash
node ask-for-a-tool.js
```

Ask a math question → see the model return a **request** to call the
calculator (not an answer). Ask "capital of France?" → see it answer
directly with no tool. The model chooses.

**Next:** [11 — executing-tools](../11-executing-tools/README.md) — the model only
asked; now we actually run the tool and complete the round-trip.
