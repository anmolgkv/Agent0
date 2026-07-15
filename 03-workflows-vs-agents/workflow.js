const MODEL = process.env.MODEL ?? "qwen3-coder:30b";

async function askLLM(prompt) {
  const res = await fetch("http://localhost:11434/api/chat", {
    method: "POST",
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: "user", content: prompt }],
      stream: false,
    }),
  });
  const data = await res.json();
  return data.message.content.trim();
}

async function workflow(email) {
  // Step 1 (developer-written): ask the LLM to pick ONE label.
  const label = await askLLM(
    `Classify this message as exactly one word — "billing" or "support":\n\n${email}\n\nReply with only the word.`
  );

  // Step 2 (developer-written): route based on the label.
  const routes = {
    billing: "→ sent to the Billing team",
    support: "→ sent to the Tech Support team",
  };
  const key = label.toLowerCase().includes("billing") ? "billing" : "support";
  return `Workflow classified as "${key}" ${routes[key]}`;
}

const email = "I was charged twice for my subscription this month.";
console.log("EMAIL:", email, "\n");
console.log(await workflow(email));

console.log("\nThe LLM only chose a label. YOU wrote every step around it.");
console.log("That's a workflow. An agent would instead be handed the goal");
console.log('"resolve this ticket" and pick its own steps — coming in Part 4.');
