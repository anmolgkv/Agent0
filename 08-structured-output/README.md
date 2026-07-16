# 08 — Structured Output: Getting JSON, Not Prose

**Builds on:** 05 · **Concept:** forcing the model to answer in a fixed shape

## The idea

<div align="center">
  <a href="https://www.youtube.com/watch?v=HBKLDXuekIU">
    <img src="https://img.youtube.com/vi/HBKLDXuekIU/maxresdefault.jpg" alt="Watch the video: Structured output" width="640">
  </a>
  <p><em>▶️ Watch the video (click the thumbnail)</em></p>
</div>

Prose is great for humans, terrible for programs. If the model replies
"Sure! John's email is john@example.com 😊", your code has to fish the
email out of a sentence. Fragile.

**Structured output** forces the model to reply as JSON matching a shape
*you* define. Ollama supports this with one extra field: `format`, set to
a JSON Schema. A schema is itself just JSON — it names the fields you
expect and the type each one must have:

```js
const schema = {
  type: "object",
  properties: {
    name:  { type: "string" },
    email: { type: "string" },
    phone: { type: ["string", "null"] },   // optional
  },
  required: ["name", "email"],
};
```

Send `format: schema`, and the reply is guaranteed to be valid JSON in
that shape:

```json
{ "name": "John Smith", "email": "john@example.com", "phone": "555-1234" }
```

Now `JSON.parse(reply)` just works. No fishing.

## Why this is a big deal for agents

This is the mechanism that makes tools possible. To call a tool, the model
must say *which* tool and *what arguments* — that's structured data, not a
sentence. Tool calling (next lessons) is structured output with a fancy
name. Nail this and tools will feel obvious.

## The mental model

A JSON Schema is a **fill-in-the-blank form**. You hand the model a form
with labeled empty fields; it hands the form back filled in. It can't
scribble in the margins.

## Run it

```bash
node structured-output.js
```

It extracts contact details from a messy sentence into clean, typed JSON —
and then uses a field directly in code, to prove it's real data.

**Next:** [09 — why-llms-need-tools](../09-why-llms-need-tools/README.md) — watch a
smart model fail, confidently, and see why.
