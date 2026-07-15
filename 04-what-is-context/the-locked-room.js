const MODEL = process.env.MODEL ?? "qwen3-coder:30b";

async function askLLM(messages) {
  const res = await fetch("http://localhost:11434/api/chat", {
    method: "POST",
    body: JSON.stringify({ model: MODEL, messages, stream: false }),
  });
  return (await res.json()).message.content.trim();
}

const question = "What is the launch code for Project Bluebird?";

// --- Attempt 1: the fact is NOT on the sheet of paper ---
console.log("Q:", question);
console.log("\n[Context has no info about Project Bluebird]");
console.log("A:", await askLLM([{ role: "user", content: question }]));

// --- Attempt 2: we put the fact IN the context ---
const withFact = [
  {
    role: "system",
    content: "Project Bluebird's launch code is TANGERINE-7. Use only facts given here.",
  },
  { role: "user", content: question },
];
console.log("\n[Same question, but the fact is now in the context]");
console.log("A:", await askLLM(withFact));

console.log("\nLesson: the model didn't get smarter — we changed what it could see.");
