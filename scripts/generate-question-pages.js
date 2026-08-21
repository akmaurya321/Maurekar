const fs = require("node:fs");
const path = require("node:path");
const source = fs.readFileSync(
  path.join(__dirname, "..", "js", "app.js"),
  "utf8",
);
const questions = [
  ...source.matchAll(
    /[\[\s]*["']([^"']+)["'],\s*["']([^"']+)["'],\s*["']([^"']+)["'],\s*["']([^"']+)["'][\s,]*\]/g,
  ),
].map((match) => ({
  title: match[1],
  slug: match[2],
  group: match[3],
  complexity: match[4],
}));
const difficultySource = source.match(/const difficultyBySlug = ({[\s\S]*?});/);
const difficultyBySlug = difficultySource
  ? Function(`return ${difficultySource[1]}`)()
  : {};
const target = path.join(__dirname, "..", "dsa", "binary-search", "questions");
fs.mkdirSync(target, { recursive: true });
for (const question of questions) {
  const difficulty = difficultyBySlug[question.slug] || "Not rated";
  const content = `<!doctype html>\n<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${question.title} | Binary Search | Maurekar</title><meta name="description" content="Understand ${question.title}, a Binary Search problem, with an approachable explanation and complexity analysis."><link rel="canonical" href="https://example.com/dsa/binary-search/questions/${question.slug}.html"><link rel="stylesheet" href="../../../css/style.css"><link rel="stylesheet" href="../../../css/problem.css"></head><body><header class="site-header"><a class="brand" href="../../../"><span class="brand-mark">AM</span><span>Maurekar</span></a><nav aria-label="Primary"><a href="../../">DSA Library</a><a href="../">Binary Search</a></nav><a class="header-button" href="../visualizer.html">Visualizer <span>→</span></a></header><main class="page-width problem-page"><p class="eyebrow">Binary Search / ${question.group}</p><h1>${question.title}</h1><p class="problem-lead">A focused explanation of this Binary Search pattern, with the key decision and the complexity to remember.</p><div class="problem-meta"><span>Complexity</span><strong>${question.complexity}</strong><span>Topic</span><strong>Binary Search</strong></div><article class="prose"><h2>Problem idea</h2><p>Work with the sorted structure and use the middle position to eliminate the part of the search space that cannot contain the answer.</p><h2>How to think about it</h2><ol><li>Define the search range clearly.</li><li>Choose the middle safely with <code>low + (high - low) / 2</code>.</li><li>Keep the half that can still contain the answer.</li></ol><h2>Java pattern</h2><pre class="code-block"><code>int low = 0, high = numbers.length - 1;\nwhile (low <= high) {\n    int middle = low + (high - low) / 2;\n    // Compare and keep the valid half.\n}</code></pre></article><p class="back-link"><a href="../">← All Binary Search questions</a></p></main><footer class="site-footer page-width"><span>Maurekar · Focused problem page</span><a href="../visualizer.html">Open visualizer</a></footer></body></html>\n`;
  fs.writeFileSync(path.join(target, `${question.slug}.html`), content);
}
console.log(`Generated ${questions.length} Binary Search pages.`);
