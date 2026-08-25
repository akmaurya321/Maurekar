const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const args = Object.fromEntries(
  process.argv.slice(2).reduce((result, value, index, values) => {
    if (!value.startsWith('--')) return result;
    result[value.slice(2)] = values[index + 1] || '';
    return result;
  }, {}),
);
const title = args.title;
const group = args.group || 'Basics';
const complexity = args.complexity || 'O(log n)';
const slug = (args.slug || title || '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

if (!title || !slug) {
  console.error(
    'Usage: npm run article:new -- --title "Topic" --slug topic --group Basics --complexity "O(log n)"',
  );
  process.exit(1);
}

const pagePath = path.join(root, 'dsa', 'binary-search', 'questions', `${slug}.html`);
const visualPath = path.join(root, 'dsa', 'binary-search', 'content', `${slug}.json`);
if (fs.existsSync(pagePath) || fs.existsSync(visualPath)) {
  console.error(`Refusing to overwrite an existing article: ${slug}`);
  process.exit(1);
}

const page = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title} | Maurekar</title>
  <meta name="description" content="Learn ${title} with clear explanations, examples, code, visual learning, and complexity analysis.">
  <link rel="stylesheet" href="../../../css/style.css">
  <link rel="stylesheet" href="../../../css/problem.css">
</head>
<body>
  <header class="site-header"><a class="brand" href="../../../index.html"><span class="brand-mark">MK</span><span>Maurekar</span></a><nav aria-label="Primary"><a href="../../index.html">DSA Library</a><a href="../index.html">Binary Search</a></nav><a class="header-button" href="../visualizer.html?topic=${slug}">Visualizer <span>→</span></a></header>
  <main class="page-width problem-page">
    <p class="eyebrow">Binary Search / ${group}</p>
    <h1>${title}</h1>
    <p class="problem-lead">Write the beginner-friendly explanation here: define the problem, show the invariant, and explain the key decision.</p>
    <div class="problem-meta"><span>Complexity</span><strong>${complexity}</strong><span>Topic</span><strong>Binary Search</strong></div>
    <article class="prose">
      <h2>Problem idea</h2><p>Explain what the algorithm finds and when it should be used.</p>
      <h2>How to think about it</h2><ol><li>Define the search range.</li><li>Choose the middle safely.</li><li>Keep the half that can still contain the answer.</li></ol>
      <h2>Java pattern</h2><pre class="code-block"><code>// Define the search range, choose a safe midpoint, and keep the half that can still contain the answer.</code></pre>
    </article>
    <p class="back-link"><a href="../index.html">← All Binary Search questions</a></p>
  </main>
</body>
</html>
`;
const visual = {
  array: [1, 2, 3],
  target: 2,
  mode: slug,
  label: title,
  languages: {
    python: {
      label: 'Python',
      code: '# Define the range, test the midpoint, and keep the half that can still contain the answer.',
    },
    java: {
      label: 'Java',
      code: '// Define the range, test the midpoint, and keep the half that can still contain the answer.',
    },
    cpp: {
      label: 'C++',
      code: '// Define the range, test the midpoint, and keep the half that can still contain the answer.',
    },
  },
  steps: [
    {
      low: 0,
      middle: 1,
      high: 3,
      highlightLine: 1,
      comparison: 'Start the walkthrough',
      message: 'Replace this starter step with the first algorithm decision.',
    },
  ],
};
fs.writeFileSync(pagePath, page);
fs.writeFileSync(visualPath, `${JSON.stringify(visual, null, 2)}\n`);

const appPath = path.join(root, 'js', 'app.js');
let app = fs.readFileSync(appPath, 'utf8');
const entry = `  [${JSON.stringify(title)}, ${JSON.stringify(slug)}, ${JSON.stringify(group)}, ${JSON.stringify(complexity)}],\n`;
if (!app.includes(`${JSON.stringify(slug)}`)) {
  app = app.replace('const questionData = [', `const questionData = [\n${entry}`);
  app = app.replace(
    'const difficultyBySlug = {',
    `const difficultyBySlug = {\n  ${JSON.stringify(slug)}: "★★☆☆☆",`,
  );
  fs.writeFileSync(appPath, app);
}
console.log(
  `Created ${slug}.html and ${slug}.json. Add the notes image, then run npm run validate.`,
);
