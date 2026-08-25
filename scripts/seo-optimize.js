const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const site = "https://akmaurya321.github.io/Maurekar";
const skip = new Set(["node_modules", ".git"]);

function htmlFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (skip.has(entry.name)) return [];
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory()
      ? htmlFiles(fullPath)
      : entry.name.endsWith(".html")
        ? [fullPath]
        : [];
  });
}

function escape(value) {
  return value.replace(
    /[&<>\"]/g,
    (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[char],
  );
}

function pageUrl(filePath) {
  const relative = path.relative(root, filePath).split(path.sep).join("/");
  return `${site}/${relative.endsWith("index.html") ? relative.slice(0, -10) : relative}`;
}

function pageName(filePath, html) {
  const heading = html
    .match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]
    .replace(/<[^>]+>/g, "")
    .trim();
  if (heading) return heading.replace(/\s+/g, " ").replace(/[.!?]+$/, "");
  const title =
    html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "DSA Learning";
  return title
    .replace(/\s*[|—-].*$/, "")
    .replace(/[.!?]+$/, "")
    .trim();
}

function upsert(html, pattern, replacement) {
  return pattern.test(html) ? html.replace(pattern, replacement) : html;
}

for (const filePath of htmlFiles(root)) {
  let html = fs.readFileSync(filePath, "utf8");
  html = html.replace(/^<!doctype html>/i, "<!DOCTYPE html>");
  html = html.replace(
    /<(meta|link|br|input|img|source|hr)([^>]*)\s*\/\s*>/gi,
    "<$1$2>",
  );
  html = html.replace(
    /(<pre[^>]*>\s*<code[^>]*>)([\s\S]*?)(<\/code>\s*<\/pre>)/gi,
    (_, start, code, end) => `${start}${code.replace(/<(?==)/g, "&lt;")}${end}`,
  );
  const url = pageUrl(filePath);
  const name = pageName(filePath, html);
  const isHome = path.relative(root, filePath) === "index.html";
  const isUtility =
    /notes-visualizer|dsa[\\/]binary-search[\\/]visualizer\.html/.test(
      path.relative(root, filePath),
    );
  const title = isHome
    ? "Learn Data Structures & Algorithms | Maurekar"
    : `${name} | Maurekar`;
  const description = isHome
    ? "Learn data structures and algorithms with clear explanations, curated problems, Java code, and interactive visualizations."
    : `Learn ${name} with clear explanations, examples, complexity analysis, code, and visual learning resources.`;
  const type = isUtility ? "website" : isHome ? "website" : "article";
  const robots = isUtility ? "noindex,follow" : "index,follow";
  const relative = path.relative(root, filePath).split(path.sep).join("/");
  const breadcrumbs =
    relative === "index.html"
      ? [{ name: "DSA", item: `${site}/` }]
      : [
          { name: "DSA", item: `${site}/dsa/` },
          { name, item: url },
        ];
  const schema = {
    "@context": "https://schema.org",
    "@type": isUtility ? "WebPage" : "LearningResource",
    name,
    description,
    url,
    inLanguage: "en",
    isPartOf: { "@type": "WebSite", name: "Maurekar", url: `${site}/` },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: crumb.item,
      })),
    },
  };
  html = html.replace(
    /<title[^>]*>[\s\S]*?<\/title>/i,
    `<title>${escape(title)}</title>`,
  );
  html = html.replace(
    /<meta\s+name=["']description["'][^>]*>/i,
    `<meta name="description" content="${escape(description)}">`,
  );
  if (!/name=["']description["']/i.test(html))
    html = html.replace(
      /<title[\s\S]*?<\/title>/i,
      `$&\n    <meta name="description" content="${escape(description)}">`,
    );
  html = html.replace(
    /<meta\s+name=["']robots["'][^>]*>/i,
    `<meta name="robots" content="${robots}">`,
  );
  if (!/name=["']robots["']/i.test(html))
    html = html.replace(
      /<meta\s+name=["']description["'][^>]*>/i,
      `$&\n    <meta name="robots" content="${robots}">`,
    );
  html = html.replace(
    /<link\s+rel=["']canonical["'][^>]*>/i,
    `<link rel="canonical" href="${url}">`,
  );
  if (!/rel=["']canonical["']/i.test(html))
    html = html.replace(
      /<meta\s+name=["']robots["'][^>]*>/i,
      `$&\n    <link rel="canonical" href="${url}">`,
    );
  const social = `    <meta property="og:type" content="${type}">\n    <meta property="og:site_name" content="Maurekar">\n    <meta property="og:title" content="${escape(title)}">\n    <meta property="og:description" content="${escape(description)}">\n    <meta property="og:url" content="${url}">\n    <meta name="twitter:card" content="summary">\n    <meta name="twitter:title" content="${escape(title)}">\n    <meta name="twitter:description" content="${escape(description)}">\n    <meta name="theme-color" content="#15211d">`;
  html = html.replace(
    /\s*<meta\s+property=["']og:type["'][\s\S]*?<meta\s+name=["']theme-color["'][^>]*>/i,
    `\n${social}`,
  );
  if (!/property=["']og:type["']/i.test(html))
    html = html.replace(
      /<link\s+rel=["']canonical["'][^>]*>/i,
      `$&\n${social}`,
    );
  html = html.replace(
    /\s*<script\s+type=["']application\/ld\+json["']\s+id=["']seo-schema["']>[\s\S]*?<\/script>/i,
    "",
  );
  html = html.replace(
    /<\/head>/i,
    `    <script type="application/ld+json" id="seo-schema">${JSON.stringify(schema)}</script>\n  </head>`,
  );
  fs.writeFileSync(filePath, html);
}

const robotsPath = path.join(root, "robots.txt");
fs.writeFileSync(
  robotsPath,
  `User-agent: *\nAllow: /\nDisallow: /notes-visualizer/\nDisallow: /dsa/binary-search/visualizer.html\nSitemap: ${site}/sitemap.xml\n`,
);

const urls = htmlFiles(root)
  .filter(
    (filePath) =>
      !/notes-visualizer|dsa[\\/]binary-search[\\/]visualizer\.html/.test(
        path.relative(root, filePath),
      ),
  )
  .map(pageUrl)
  .sort();
fs.writeFileSync(
  path.join(root, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((url) => `  <url><loc>${url}</loc></url>`).join("\n")}\n</urlset>\n`,
);
console.log(
  `Optimized ${htmlFiles(root).length} HTML pages and generated ${urls.length} sitemap URLs.`,
);
