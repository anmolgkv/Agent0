// Lists the open-weight models installed on your machine via Ollama.
// Run with:  node list-models.js

const res = await fetch("http://localhost:11434/api/tags");
const { models } = await res.json();

if (!models.length) {
  console.log("No models yet. Try:  ollama pull qwen3-coder:30b");
} else {
  console.log("Models living on your machine right now:\n");
  for (const m of models) {
    const sizeGB = (m.size / 1e9).toFixed(1);
    console.log(`  • ${m.name.padEnd(28)} ${sizeGB} GB`);
  }
  console.log("\nThese run locally. No internet required. No cost per use.");
}
