// Proves LLMs are stateless, then fixes it by re-sending the history.
// Run with:  node no-memory.js

const MODEL = process.env.MODEL ?? "qwen3-coder:30b";

async function ask(messages) {
  const res = await fetch("http://localhost:11434/api/chat", {
    method: "POST",
    body: JSON.stringify({ model: MODEL, messages, stream: false }),
  });
  return (await res.json()).message.content.trim();
}

console.log("=== WITHOUT memory (two separate calls) ===");
console.log("A:", await ask([{ role: "user", content: "My name is Anmol." }]));
console.log("A:", await ask([{ role: "user", content: "What is my name?" }]));

console.log("\n=== WITH memory (we keep and re-send the history) ===");
const messages = [];

messages.push({ role: "user", content: "My name is Anmol." });
const reply1 = await ask(messages);
messages.push({ role: "assistant", content: reply1 }); // <-- remember our reply
console.log("A:", reply1);

messages.push({ role: "user", content: "What is my name?" });
const reply2 = await ask(messages);
console.log("A:", reply2);

console.log("\nNo magic — the name simply stayed in the messages array.");
