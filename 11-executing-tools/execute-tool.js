// The complete 5-step tool-calling round-trip, printed step by step.
// Run with:  node execute-tool.js

const MODEL = process.env.MODEL ?? "qwen3-coder:30b";

// The REAL function. This is what actually computes.
function calculator(a, b) {
  return a * b;
}

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

async function ask(messages) {
  const res = await fetch("http://localhost:11434/api/chat", {
    method: "POST",
    body: JSON.stringify({ model: MODEL, stream: false, tools, messages }),
  });
  return (await res.json()).message;
}

const messages = [{ role: "user", content: "What is 1234 times 5678?" }];

// STEP 1 + 2: send the question, receive a tool call
console.log("1-2. Sending question, waiting for the model...");
let m = await ask(messages);
messages.push(m); // remember what the model asked for
const call = m.tool_calls[0];
console.log(`     Model asked: ${call.function.name}(${JSON.stringify(call.function.arguments)})`);

// STEP 3: WE run the real function
const { a, b } = call.function.arguments; // Ollama gives arguments as an object
const result = calculator(a, b);
console.log(`3.   We ran the function → ${result}`);

// STEP 4: return the result to the model, tagged as a tool result
messages.push({
  role: "tool",
  tool_name: call.function.name,
  content: String(result),
});
console.log("4.   Result handed back to the model as a 'tool' message.");

// STEP 5: model reads the result and writes the final answer
m = await ask(messages);
console.log("5.   Final answer:", m.content.trim());
