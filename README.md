# Maurekar

Code learning Platform

## Add an article

Create a safe starter page and visualizer data without overwriting an existing article:

```bash
npm run article:new -- --title "New Topic" --slug new-topic --group Basics --complexity "O(log n)"
```

Then replace the starter explanation, code, and visualizer steps, add an optional notes image at `content/notes/binary-search/new-topic.png`, and run:

```bash
npm run validate
npm run seo
```

The visualizer resolves `content/<slug>.json` automatically, and the notes viewer resolves a matching `<slug>.png` automatically. The scaffold refuses to overwrite an existing page or visualizer file.
