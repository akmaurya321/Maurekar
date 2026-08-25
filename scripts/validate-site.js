const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const appSource = fs.readFileSync(path.join(root, 'js', 'app.js'), 'utf8');
const issues = [];
const questions = [...appSource.matchAll(/\[\s*["']([^"']+)["'],\s*["']([^"']+)["']/g)].map(
  (match) => ({ title: match[1], slug: match[2] }),
);

for (const question of questions) {
  const page = path.join(root, 'dsa', 'binary-search', 'questions', `${question.slug}.html`);
  if (!fs.existsSync(page)) issues.push(`Missing article page: ${question.slug}`);
}

const visualDirectory = path.join(root, 'dsa', 'binary-search', 'content');
for (const file of fs.readdirSync(visualDirectory)) {
  if (!file.endsWith('.json')) continue;
  try {
    const data = JSON.parse(fs.readFileSync(path.join(visualDirectory, file), 'utf8'));
    if (!Array.isArray(data.array) || !Array.isArray(data.steps))
      issues.push(`Invalid visualizer data: ${file}`);
    if (!data.languages || !data.languages.python)
      issues.push(`Missing Python implementation: ${file}`);
  } catch (error) {
    issues.push(`Invalid JSON: ${file} (${error.message})`);
  }
}

const notesDirectory = path.join(root, 'content', 'notes', 'binary-search');
const notes = fs.readdirSync(notesDirectory).filter((file) => file.endsWith('.png'));
if (notes.length === 0) issues.push('No binary-search notes assets found');

if (issues.length) {
  console.error(issues.map((issue) => `- ${issue}`).join('\n'));
  process.exitCode = 1;
} else {
  console.log(
    `Validated ${questions.length} article entries, visualizer JSON files, and notes assets.`,
  );
}
