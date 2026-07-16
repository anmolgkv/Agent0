// The model returns a REQUEST to call a tool — it does not run anything.
// Run with:  node ask-for-a-tool.js

const MODEL = process.env.MODEL ?? "qwen3-coder:30b";

// The "note" describing what tools exist.
const tools = [
  {
    type: "function",
    function: {
      name: "calculator",
      description: "Multiply two numbers together.",
      parameters: {
        type: "object",
        properties: { a: { type: "number" }, b: { type: "number" } },
        required: ["a", "b"],
      },
    },
  },
];

async function ask(question) {
  const res = await fetch("http://localhost:11434/api/chat", {
    method: "POST",
    body: JSON.stringify({
      model: MODEL,
      stream: false,
      tools,
      messages: [{ role: "user", content: question }],
    }),
  });
  return (await res.json()).message;
}

// Needs the tool:
console.log('Q: "What is 1234 times 5678?"');
const m1 = await ask("What is 1234 times 5678?");

if (m1.tool_calls) {
  const c = m1.tool_calls[0].function;
  console.log(`→ The model ASKED to run: ${c.name}(${JSON.stringify(c.arguments)})`);
  console.log("  (Notice: no answer yet. It only made a request.)");
} else {
  console.log("→ (model answered directly):", m1.content);
}

// Doesn't need the tool:
console.log('\nQ: "What is the capital of France?"');
const m2 = await ask("What is the capital of France?");
console.log(
  m2.tool_calls
    ? `→ asked for a tool: ${m2.tool_calls[0].function.name}`
    : `→ answered directly (no tool): ${m2.content.trim()}`
);
