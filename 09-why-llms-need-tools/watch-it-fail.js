// A capable model, no tools — watch it hit the walls of time and precision.
// Run with:  node watch-it-fail.js

const MODEL = process.env.MODEL ?? "qwen3-coder:30b";

async function ask(question) {
  const res = await fetch("http://localhost:11434/api/chat", {
    method: "POST",
    body: JSON.stringify({
      model: MODEL,
      stream: false,
      messages: [
        {
          role: "system",
          content:
            "Answer directly and confidently. You have no tools and no internet.",
        },
        { role: "user", content: question },
      ],
    }),
  });
  return (await res.json()).message.content.trim();
}

// PRECISION wall — verify this on a real calculator afterward.
const a = 48127, b = 90341;
console.log(`Q: What is ${a} × ${b}?`);
console.log("A:", await ask(`What is ${a} times ${b}? Give only the number.`));
console.log(`   (real answer: ${a * b} — did the model match?)`);

// TIME wall — the model can't know the real current date.
console.log("\nQ: What is today's date?");
console.log("A:", await ask("What is today's date?"));
console.log(`   (your computer says: ${new Date().toDateString()})`);

console.log("\nThe model sounded sure both times. Confidence ≠ correctness.");
console.log("Next: we give it a calculator it can actually call.");
