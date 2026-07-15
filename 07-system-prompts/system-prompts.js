// One user question, several system prompts. Same input, different behavior.
// Run with:  node system-prompts.js

const MODEL = process.env.MODEL ?? "qwen3-coder:30b";

async function ask(system, user) {
  const res = await fetch("http://localhost:11434/api/chat", {
    method: "POST",
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      stream: false,
    }),
  });
  return (await res.json()).message.content.trim();
}

const question = "What is the capital of France?";
const personas = [
  "You are a helpful assistant.",
  "You are a pirate. Answer only in pirate slang.",
  "You answer in exactly one word, nothing else.",
  "You are a geography teacher. Answer, then add one fun fact.",
];

for (const system of personas) {
  console.log(`\nSYSTEM: ${system}`);
  console.log(`A: ${await ask(system, question)}`);
}

console.log("\nThe user question never changed — only the system prompt did.");
