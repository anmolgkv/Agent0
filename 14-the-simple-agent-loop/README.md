# 14 — The Simple Agent Loop

**Builds on:** 11, 13 · **Concept:** a `while` loop turns tool-calling into an agent

## The idea

<div align="center">
  <a href="https://www.youtube.com/watch?v=v8g1tdA0OfQ">
    <img src="https://img.youtube.com/vi/v8g1tdA0OfQ/maxresdefault.jpg" alt="Watch the video: The simple agent loop" width="640">
  </a>
  <p><em>▶️ Watch the video (click the thumbnail)</em></p>
</div>

This is the payoff of Part 3. Everything clicks together here.

In lesson 11 we ran the tool flow **once**. But real tasks need many
steps: search one fact, then another, then calculate. We don't know how
many in advance. So we don't hard-code the number — we **loop until the
model stops asking for tools**.

```js
while (true) {
  const m = await ask(messages);      // model thinks
  messages.push(m);

  if (!m.tool_calls) {                // no tool wanted → it's the final answer
    return m.content;
  }

  for (const call of m.tool_calls) {  // run every tool it asked for
    const output = await toolbox[call.function.name].run(call.function.arguments);
    messages.push({ role: "tool", tool_name: call.function.name, content: String(output) });
  }
  // loop again — the model now sees the tool results
}
```

That's it. **That `while` loop is the agent.** Read it out loud:

> Ask the model. If it wants a tool, run it and feed the result back. If it
> doesn't, we're done. Repeat.

One new detail: the model can ask for *several* tools in a single reply —
that's why `tool_calls` is an array and we run each one before looping.
(Lesson 11 only ever had one call, so we grabbed `tool_calls[0]`.)

## Why this is the whole ballgame

Notice what the loop gives you for free:

- **Multi-step reasoning.** Search → calculate → answer happens naturally,
  because each tool result re-enters the context and the model plans its
  next move.
- **The model controls the length.** Easy question: zero loops. Hard
  question: five loops. You never decided that — the model did.
- **It's the same 5-step flow from lesson 11**, just wrapped in `while`.

## One safety rail

An LLM can get stuck asking for tools forever. Always cap the loop with a
`maxSteps` counter so a confused model can't run up your machine (or your
bill, on cloud models). Ours stops after 10 steps.

## Run it

```bash
node agent-loop.js
node agent-loop.js "How many minutes are in a week, and what's the capital of Japan?"
```

Give it a question needing two tools. Watch it loop: search, then
calculate, then answer — deciding each step itself.

**Next:** [15 — what-is-mcp](../15-what-is-mcp/README.md) — a standard plug that
lets your agent use tools other people built.
