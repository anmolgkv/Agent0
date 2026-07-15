// The smallest possible program that talks to your local LLM.
// Run with:  node first-call.js
//        or:  node first-call.js "your own question here"

const MODEL = process.env.MODEL ?? "qwen3-coder:30b";
const question = process.argv[2] ?? "What is the capital of France?";

const res = await fetch("http://localhost:11434/api/chat", {
  method: "POST",
  body: JSON.stringify({
    model: MODEL,
    messages: [
      { role: "user", content: question }
    ],
    stream: false, // wait for the full answer instead of streaming word-by-word
  }),
});

const data = await res.json();

console.log("You:", question);
console.log("AI :", data.message.content.trim());
