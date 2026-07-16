// A real tool: live Wikipedia search (free, no API key).
// Run with:  node search-tool.js
//        or:  node search-tool.js "Who won the 2025 Nobel Prize in Physics?"

const MODEL = process.env.MODEL ?? "qwen3-coder:30b";

// --- The tool: an ordinary async function. Nothing AI-specific here. ---
async function searchWikipedia(query) {
  try {
    const url =
      "https://en.wikipedia.org/w/api.php?action=query&list=search" +
      `&srsearch=${encodeURIComponent(query)}&format=json&srlimit=3`;
    const res = await fetch(url, {
      headers: { "User-Agent": "agents-from-scratch-course/1.0" },
    });
    const data = await res.json();
    if (!data.query?.search?.length) return "No results found.";
    return data.query.search
      .map((r) => `${r.title}: ${r.snippet.replace(/<[^>]+>/g, "")}`)
      .join("\n");
  } catch (err) {
    // Return the error as text so the model can read it and adapt.
    return `Search failed: ${err.message}`;
  }
}

const tools = [
  {
    type: "function",
    function: {
      name: "search_wikipedia",
      description:
        "Search Wikipedia for facts about people, places, events, and history. " +
        "Use this whenever you need information you are unsure about or that may be recent.",
      parameters: {
        type: "object",
        properties: { query: { type: "string", description: "search terms" } },
        required: ["query"],
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

const question =
  process.argv[2] ?? "What is Eliud Kipchoge's marathon world record time?";
const messages = [{ role: "user", content: question }];
console.log("Q:", question, "\n");

let m = await ask(messages);
messages.push(m);

if (m.tool_calls) {
  const call = m.tool_calls[0];
  console.log(`🔎 searching: "${call.function.arguments.query}"`);
  const result = await searchWikipedia(call.function.arguments.query);
  messages.push({ role: "tool", tool_name: call.function.name, content: result });
  m = await ask(messages);
}

console.log("\nA:", m.content.trim());
