// Verifies that Ollama is running and your model is downloaded.
// Run with:  node check.js
// Different model:  MODEL=qwen3:8b node check.js

const MODEL = process.env.MODEL ?? "qwen3-coder:30b";

try {
  const res = await fetch("http://localhost:11434/api/tags");
  const { models } = await res.json();
  const names = models.map((m) => m.name);

  console.log("✅ Ollama is running at http://localhost:11434");

  const family = MODEL.split(":")[0];
  if (names.some((n) => n.startsWith(family))) {
    console.log(`✅ Model available: ${MODEL}`);
    console.log("\nYou are ready for lesson 01!");
  } else {
    console.log(`❌ Model "${MODEL}" not found.`);
    console.log(`   Fix it with:  ollama pull ${MODEL}`);
    console.log(`   Installed models: ${names.join(", ") || "(none)"}`);
  }
} catch {
  console.log("❌ Could not reach Ollama.");
  console.log("   1. Install it from https://ollama.com");
  console.log("   2. Make sure the Ollama app is running, then try again.");
}
