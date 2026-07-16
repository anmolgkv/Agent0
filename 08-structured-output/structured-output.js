// Force the model to answer as JSON in a shape we define.
// Run with:  node structured-output.js

const MODEL = process.env.MODEL ?? "qwen3-coder:30b";

// The "fill-in-the-blank form" we hand the model.
const schema = {
  type: "object",
  properties: {
    name: { type: "string" },
    email: { type: "string" },
    phone: { type: ["integer"] },
  },
  required: ["name", "email", "phone"],
};

const messy =
  "Hey, I'm John Smith — shoot me a note at john@example.com";

const res = await fetch("http://localhost:11434/api/chat", {
  method: "POST",
  body: JSON.stringify({
    model: MODEL,
    stream: false,
    format: schema, // <-- the one line that changes everything
    messages: [
      { role: "system", content: "Extract the contact details." },
      { role: "user", content: messy },
    ],
  }),
});

const raw = (await res.json()).message.content;
console.log("Raw reply (already valid JSON):\n", raw);

// Because it's structured, we can parse and USE it like normal data.
const contact = JSON.parse(raw);
console.log("\nUsing a field in code:");
console.log(`  Send the invoice to → ${contact.email}`);
