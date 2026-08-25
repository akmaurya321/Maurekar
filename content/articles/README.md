# Article Structure

This directory is the future source of truth for article metadata. It is intentionally not connected to the live page renderer yet, so the current site remains unchanged while articles are migrated safely.

Each article entry keeps its page, visualizer data, and notes asset together:

```json
{
  "title": "New Topic",
  "slug": "new-topic",
  "section": "Binary Search",
  "group": "Basics",
  "complexity": "O(log n)",
  "page": "dsa/binary-search/questions/new-topic.html",
  "visualizer": "dsa/binary-search/content/new-topic.json",
  "notes": "content/notes/binary-search/new-topic.png",
  "status": "draft"
}
```

Do not remove or rename the existing page until its replacement has passed the validation command and a browser comparison.
