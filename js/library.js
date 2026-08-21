const topicRoutes = {
  Arrays: "arrays/",
  Strings: "strings/",
  "Recursion & Sorting": "recursion/",
  "Linked Lists": "linked-list/",
  "Stacks & Queues": "stack/",
  "Trees, Tries & Hashmaps": "tree/",
  Graphs: "graph/",
  "DP, Greedy & Backtracking": "dynamic-programming/",
};

document.querySelectorAll(".directory-row").forEach((row) => {
  const title = row.querySelector("strong")?.textContent.trim();
  const route = topicRoutes[title];
  if (!route || row.tagName === "A") return;
  const link = document.createElement("a");
  link.className = row.className;
  link.href = route;
  link.innerHTML = row.innerHTML;
  row.replaceWith(link);
});
