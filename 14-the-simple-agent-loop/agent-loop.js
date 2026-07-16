// The whole point of Part 3: wrap tool-calling in a loop and you have an agent.
// Run with:  node agent-loop.js
//        or:  node agent-loop.js "your multi-step question"

const MODEL = process.env.MODEL ?? "qwen3-coder:30b";

// --- tool helper (from lesson 13) ---
function tool({ name, description, parameters, run }) {
  return { run, definition: { type: "function", function: { name, description, parameters } } };
}

// --- two tools ---
const calculator = tool({
  name: "calculator",
  description: "Do arithmetic. Supports + - * / on two numbers.",
  parameters: {
    type: "object",
    properties: {
      op: { type: "string", enum: ["add", "subtract", "multiply", "divide"] },
      a: { type: "number" },
      b: { type: "number" },
    },
    required: ["op", "a", "b"],
  },
  run: ({ op, a, b }) =>
    ({ add: a + b, subtract: a - b, multiply: a * b, divide: a / b }[op]),
});

const searchWikipedia = tool({
  name: "search_wikipedia",
  description: "Search Wikipedia for facts about people, places, and events.",
  parameters: {
    type: "object",
    properties: { query: { type: "string" } },
    required: ["query"],
  },
  run: async ({ query }) => {
    try {
      const url =
        "https://en.wikipedia.org/w/api.php?action=query&list=search" +
        `&srsearch=${encodeURIComponent(query)}&format=json&srlimit=3`;
      const res = await fetch(url, { headers: { "User-Agent": "agents-course/1.0" } });
      const data = await res.json();
      return data.query.search
        .map((r) => `${r.title}: ${r.snippet.replace(/<[^>]+>/g, "")}`)
        .join("\n");
    } catch (e) {
      return `Search failed: ${e.message}`;
    }
  },
});

const tools = [calculator, searchWikipedia];
const toolbox = Object.fromEntries(tools.map((t) => [t.definition.function.name, t]));
const definitions = tools.map((t) => t.definition);

async function ask(messages) {
  const res = await fetch("http://localhost:11434/api/chat", {
    method: "POST",
    body: JSON.stringify({ model: MODEL, stream: false, tools: definitions, messages }),
  });
  return (await res.json()).message;
}

// --- THE AGENT: the loop is the whole thing ---
async function runAgent(question, maxSteps = 10) {
  const messages = [
    { role: "system", content: "Use tools when helpful. Then give a clear final answer." },
    { role: "user", content: question },
  ];

  for (let step = 1; step <= maxSteps; step++) {
    const m = await ask(messages);
    messages.push(m);

    if (!m.tool_calls) return m.content.trim(); // no tool wanted → done

    for (const call of m.tool_calls) {
      const { name, arguments: args } = call.function;
      console.log(`  step ${step}: ${name}(${JSON.stringify(args)})`);
      const output = await toolbox[name].run(args);
      messages.push({ role: "tool", tool_name: name, content: String(output) });
    }
  }
  return "Stopped: hit the max step limit.";
}

const question =
  process.argv[2] ??
  "What is Eliud Kipchoge's marathon record in seconds? Multiply his time (2:01:41) out and tell me the total seconds.";
console.log("Q:", question, "\n");
console.log("A:", await runAgent(question));
