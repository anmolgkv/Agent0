# 12 — A Real Tool: Live Web Search

**Builds on:** 11 · **Concept:** a tool that touches the real world

## The idea

<div align="center">
  <a href="https://www.youtube.com/watch?v=nYu7FaLpeBg">
    <img src="https://img.youtube.com/vi/nYu7FaLpeBg/maxresdefault.jpg" alt="Watch the video: A real tool — live web search" width="640">
  </a>
  <p><em>▶️ Watch the video (click the thumbnail)</em></p>
</div>

The calculator was a warm-up. The tool that makes agents genuinely useful
is **search** — it breaks the "time wall" from lesson 09 by pulling in
information the model never saw during training.

A common choice is a paid search API (like Tavily, which needs a key). To
keep this course 100% free and local-friendly, we use **Wikipedia's public
search API** — no key, no signup, no cost. The pattern is identical; only
the URL changes.

```js
async function searchWikipedia(query) {
  const url =
    "https://en.wikipedia.org/w/api.php?action=query&list=search" +
    `&srsearch=${encodeURIComponent(query)}&format=json&srlimit=3`;
  const res = await fetch(url, { headers: { "User-Agent": "agents-course/1.0" } });
  const data = await res.json();
  return data.query.search
    .map((r) => `${r.title}: ${r.snippet.replace(/<[^>]+>/g, "")}`)
    .join("\n");
}
```

(The `replace` strips the HTML tags Wikipedia embeds in its snippets, so
the model gets plain text.)

Wrap it in the same tool definition shape from lesson 10, run the same
5-step flow from lesson 11, and the model can now answer questions about
things it was never trained on.

## The key realization

**A tool is just a normal function.** There's nothing AI-specific about
`searchWikipedia` — it's plain `fetch`. Any function you can write can
become a tool: read a file, query a database, hit your company's API,
control a smart light. The LLM part is only *deciding when to call it*.

That means your existing code is already a library of potential tools.

## One honest caveat: tools can fail

Real APIs time out, rate-limit, and return junk. A production tool wraps
its call in `try/catch` and returns a readable error string instead of
crashing — so the model can read "search failed, try again" and adapt.
Our version does this. (Recovering from failure is a Part 4 superpower.)

## Run it

```bash
node search-tool.js
node search-tool.js "Who won the 2025 Nobel Prize in Physics?"
```

Ask about something recent. The model will reach for the search tool, read
the result, and answer from *fresh* information instead of guessing.

**Next:** [13 — the-tool-helper](../13-the-tool-helper/README.md) — bundle each
function with its definition so the two can't drift apart.
