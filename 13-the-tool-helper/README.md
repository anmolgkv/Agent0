# 13 — The Tool Helper: One Object, Not Two

**Builds on:** 11, 12 · **Concept:** keep the function and its definition together

## The idea

<div align="center">
  <a href="https://www.youtube.com/watch?v=l131e3KVyKw">
    <img src="https://img.youtube.com/vi/l131e3KVyKw/maxresdefault.jpg" alt="Watch the video: The tool helper" width="640">
  </a>
  <p><em>▶️ Watch the video (click the thumbnail)</em></p>
</div>

So far every tool has been **two separate things**:

1. the **definition** (the JSON the model reads)
2. the **function** (the code that runs)

Keeping them apart is a bug waiting to happen. You rename the function but
forget the definition; the model asks for `calculator` but your lookup
table still says `calc`. As tools multiply, this drift gets painful.

The fix is a tiny helper that **bundles both into one object**:

```js
function tool({ name, description, parameters, run }) {
  return {
    run,                                             // the real function
    definition: { type: "function", function: { name, description, parameters } },
  };
}
```

Now a tool is one self-contained thing:

```js
const calculator = tool({
  name: "calculator",
  description: "Multiply two numbers.",
  parameters: {
    type: "object",
    properties: { a: { type: "number" }, b: { type: "number" } },
    required: ["a", "b"],
  },
  run: ({ a, b }) => a * b,
});

calculator.definition   // → send this to the model
calculator.run({a:2,b:3}) // → 6, call this when the model asks
```

## The toolbox pattern

With bundled tools, wiring many of them up becomes clean. Build a lookup
by name once:

```js
const toolbox = Object.fromEntries(
  [calculator, searchTool].map((t) => [t.definition.function.name, t])
);

// when the model asks for a tool by name:
const output = await toolbox[call.function.name].run(call.function.arguments);
```

(`Object.fromEntries` turns that list of `[name, tool]` pairs into a plain
lookup object, so `toolbox["calculator"]` finds the right tool.)

No `if/else` ladder, no drift. Add a tool → it just works. This helper is
the foundation the agent loop (next lesson) is built on.

## Why this is the same move real frameworks make

Agent frameworks wrap functions in a `FunctionTool` class or a `@tool`
decorator to do exactly this — turn a plain function into a self-describing
tool. Same idea, lighter syntax here. The principle: **a tool should
describe itself.**

## Run it

```bash
node tool-helper.js
```

Two tools, one toolbox, dispatched by name — with zero hand-written
routing.

**Next:** [14 — the-simple-agent-loop](../14-the-simple-agent-loop/README.md) —
wrap this in a `while` loop and you've built an agent.
