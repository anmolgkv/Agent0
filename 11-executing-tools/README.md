# 11 — Executing Tools: The Full 5-Step Flow

**Builds on:** 10 · **Concept:** the complete round-trip, once

## The idea

<div align="center">
  <a href="https://www.youtube.com/watch?v=P-GlhfHYiNU">
    <img src="https://img.youtube.com/vi/P-GlhfHYiNU/maxresdefault.jpg" alt="Watch the video: Executing tools — the full 5-step flow" width="640">
  </a>
  <p><em>▶️ Watch the video (click the thumbnail)</em></p>
</div>

Lesson 10 ended with the model *asking* for a tool. Now we complete the
loop — the five steps that turn a request into a real answer. This is the
single most important flow in the whole course. Learn it once here; the
agent in Part 4 just repeats it.

```
1. SEND     question + tool definitions  ─────►  model
2. RECEIVE  a tool_call  ("run calculator(1234, 5678)")  ◄──  model
3. EXECUTE  YOUR code runs the real function → 7006652
4. RETURN   send the result back as a "tool" message  ─────►  model
5. FINISH   model reads the result and writes the answer  ◄──  model
```

## The code, step by step

(`ask` is our small helper from earlier lessons: one chat call to Ollama,
returning the model's reply message.)

```js
const messages = [{ role: "user", content: "What is 1234 * 5678?" }];

// 1 + 2: send, get a tool call back
let m = await ask(messages, tools);
messages.push(m);                       // remember the model's request

// 3: WE run the actual function
const call = m.tool_calls[0];
const { a, b } = call.function.arguments;   // already an object in Ollama
const result = calculator(a, b);            // 7006652

// 4: hand the result back, tagged as a tool result
messages.push({ role: "tool", tool_name: call.function.name, content: String(result) });

// 5: ask again — now it has the number and can answer
m = await ask(messages, tools);
console.log(m.content);   // "1234 × 5678 = 7,006,652"
```

Two details that trip people up:

- **You must push the model's tool-call message *and* the tool result**
  into `messages` before asking again. Both belong on the "sheet of paper."
- The tool result goes in with **`role: "tool"`** so the model knows it's
  answering its own earlier request.

## Why step 5 exists

For a calculator the number *is* the answer, so step 5 feels redundant.
But for a web search, step 3 returns a wall of raw text — the model needs
step 5 to read it and write a clean sentence. The round-trip is what lets
tools feed reasoning.

## Run it

```bash
node execute-tool.js
```

You'll see all five steps print in order, ending in a correct,
tool-computed answer — no more confident guessing.

**Next:** [12 — real-world-tools](../12-real-world-tools/README.md) — the same
five steps, with a tool that searches the live web.
