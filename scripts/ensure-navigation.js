const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const navigationScript = path.join(root, 'js', 'site-navigation.js');
const articleScript = path.join(root, 'js', 'article-nav.js');

const walk = (directory) => {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.git') continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walk(fullPath));
    else if (entry.isFile() && entry.name.endsWith('.html')) files.push(fullPath);
  }
  return files;
};

for (const file of walk(root)) {
  const relative = (target) => path.relative(path.dirname(file), target).replaceAll('\\', '/');
  let content = fs.readFileSync(file, 'utf8');
  const scripts = [`<script src="${relative(navigationScript)}"></script>`];
  if (file.includes(`${path.sep}dsa${path.sep}binary-search${path.sep}questions${path.sep}`)) {
    scripts.push(`<script src="${relative(articleScript)}"></script>`);
  }
  for (const script of scripts) {
    if (!content.includes(script)) content = content.replace('</body>', `  ${script}\n</body>`);
  }
  fs.writeFileSync(file, content, 'utf8');
}
