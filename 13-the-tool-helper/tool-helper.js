// Bundle each tool's function and definition into one self-describing object,
// then dispatch calls through a toolbox with no hand-written routing.
// Run with:  node tool-helper.js

// --- the helper (the whole idea of this lesson) ---
function tool({ name, description, parameters, run }) {
  return {
    run,
    definition: { type: "function", function: { name, description, parameters } },
  };
}

// --- two self-contained tools ---
const calculator = tool({
  name: "calculator",
  description: "Multiply two numbers together.",
  parameters: {
    type: "object",
    properties: { a: { type: "number" }, b: { type: "number" } },
    required: ["a", "b"],
  },
  run: ({ a, b }) => a * b,
});

const shout = tool({
  name: "shout",
  description: "Return the given text in all caps.",
  parameters: {
    type: "object",
    properties: { text: { type: "string" } },
    required: ["text"],
  },
  run: ({ text }) => text.toUpperCase(),
});

// --- a toolbox: name → tool, built once ---
const tools = [calculator, shout];
const toolbox = Object.fromEntries(
  tools.map((t) => [t.definition.function.name, t])
);

// --- generic dispatch: works for ANY tool in the box ---
function runToolCall(name, args) {
  const t = toolbox[name];
  if (!t) return `Unknown tool: ${name}`;
  return t.run(args);
}

console.log("Definitions we'd send to the model:");
console.log(tools.map((t) => "  • " + t.definition.function.name).join("\n"));

console.log("\nDispatching calls by name (no if/else ladder):");
console.log('  calculator({a:1234, b:5678}) →', runToolCall("calculator", { a: 1234, b: 5678 }));
console.log('  shout({text:"agents"})       →', runToolCall("shout", { text: "agents" }));
