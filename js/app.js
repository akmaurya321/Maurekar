const questionData = [
  [
    "Search X in Sorted Array",
    "search-x-in-sorted-array",
    "Basics",
    "O(log n)",
  ],
  ["Lower Bound", "lower-bound", "Basics", "O(log n)"],
  ["Upper Bound", "upper-bound", "Basics", "O(log n)"],
  ["Search Insert Position", "search-insert-position", "Basics", "O(log n)"],
  ["Floor in Sorted Array", "floor-in-sorted-array", "Basics", "O(log n)"],
  ["Ceil in Sorted Array", "ceil-in-sorted-array", "Basics", "O(log n)"],
  [
    "First 1 in a Sorted Binary Array",
    "first-one-sorted-binary-array",
    "Basics",
    "O(log n)",
  ],
  [
    "Kth Missing Positive Number",
    "kth-missing-positive-number",
    "Basics",
    "O(log n)",
  ],
  [
    "Find Minimum in Rotated Sorted Array",
    "minimum-rotated-sorted-array",
    "Intermediate",
    "O(log n)",
  ],
  [
    "First and Last Occurrence",
    "first-and-last-occurrence",
    "Intermediate",
    "O(log n)",
  ],
  [
    "Search in Rotated Sorted Array I",
    "search-rotated-sorted-array-i",
    "Intermediate",
    "O(log n)",
  ],
  [
    "Search in Rotated Sorted Array II",
    "search-rotated-sorted-array-ii",
    "Intermediate",
    "O(log n)",
  ],
  [
    "Single Element in a Sorted Array",
    "single-element-sorted-array",
    "Intermediate",
    "O(log n)",
  ],
  ["Find Kth Rotation", "find-kth-rotation", "Intermediate", "O(log n)"],
  ["Find Peak Element", "find-peak-element", "Intermediate", "O(log n)"],
  [
    "Count Negative Numbers in a Sorted Matrix",
    "count-negative-sorted-matrix",
    "2D Arrays",
    "O(m + n)",
  ],
  [
    "Find Row with Maximum 1s",
    "row-with-maximum-ones",
    "2D Arrays",
    "O(m + n)",
  ],
  ["Search a 2D Matrix I", "search-2d-matrix-i", "2D Arrays", "O(log mn)"],
  ["Search a 2D Matrix II", "search-2d-matrix-ii", "2D Arrays", "O(m + n)"],
  ["Find Peak Element II", "find-peak-element-ii", "2D Arrays", "O(m log n)"],
  [
    "Median in a Row-wise Sorted Matrix",
    "median-row-wise-sorted-matrix",
    "2D Arrays",
    "Binary Search",
  ],
  ["Sqrt(x)", "sqrt-x", "BS on Answer", "O(log n)"],
  ["Valid Perfect Square", "valid-perfect-square", "BS on Answer", "O(log n)"],
  [
    "Find Nth Root of a Number",
    "nth-root-of-number",
    "BS on Answer",
    "O(log n)",
  ],
  ["Koko Eating Bananas", "koko-eating-bananas", "BS on Answer", "O(n log m)"],
  [
    "Smallest Divisor Given a Threshold",
    "smallest-divisor-threshold",
    "BS on Answer",
    "O(n log m)",
  ],
  [
    "Minimum Speed to Arrive on Time",
    "minimum-speed-arrive-on-time",
    "BS on Answer",
    "O(n log m)",
  ],
  [
    "Minimum Days to Make M Bouquets",
    "minimum-days-make-bouquets",
    "BS on Answer",
    "O(n log m)",
  ],
  [
    "Capacity to Ship Packages Within D Days",
    "ship-packages-d-days",
    "BS on Answer",
    "O(n log m)",
  ],
  [
    "Book Allocation Problem",
    "book-allocation-problem",
    "BS on Answer",
    "O(n log m)",
  ],
  [
    "Split Array Largest Sum",
    "split-array-largest-sum",
    "BS on Answer",
    "O(n log m)",
  ],
  [
    "Painter’s Partition Problem",
    "painters-partition-problem",
    "BS on Answer",
    "O(n log m)",
  ],
  [
    "Kth Element of Two Sorted Arrays",
    "kth-element-two-sorted-arrays",
    "BS on Answer",
    "O(log min(n,m))",
  ],
  ["Aggressive Cows", "aggressive-cows", "BS on Answer", "O(n log m)"],
  [
    "Minimize Max Distance to Gas Station",
    "minimize-max-distance-gas-station",
    "BS on Answer",
    "O(n log m)",
  ],
  [
    "Median of Two Sorted Arrays",
    "median-two-sorted-arrays",
    "BS on Answer",
    "O(log min(n,m))",
  ],
  ["Search in a Sorted Array", "search-in-sorted-array", "Basics", "O(log n)"],
];
const difficultyBySlug = {
  "search-x-in-sorted-array": "★★☆☆☆",
  "lower-bound": "★★☆☆☆",
  "upper-bound": "★★☆☆☆",
  "search-insert-position": "★★☆☆☆",
  "floor-in-sorted-array": "★★☆☆☆",
  "ceil-in-sorted-array": "★★☆☆☆",
  "first-one-sorted-binary-array": "★★☆☆☆",
  "kth-missing-positive-number": "★★☆☆☆",
  "minimum-rotated-sorted-array": "★★☆☆☆",
  "first-and-last-occurrence": "★★★☆☆",
  "search-rotated-sorted-array-i": "★★★☆☆",
  "search-rotated-sorted-array-ii": "★★★☆☆",
  "single-element-sorted-array": "★★★☆☆",
  "find-kth-rotation": "★★★☆☆",
  "find-peak-element": "★★★☆☆",
  "count-negative-sorted-matrix": "★★☆☆☆",
  "row-with-maximum-ones": "★★☆☆☆",
  "search-2d-matrix-i": "★★☆☆☆",
  "search-2d-matrix-ii": "★★★☆☆",
  "find-peak-element-ii": "★★★★☆",
  "median-row-wise-sorted-matrix": "★★★★☆",
  "sqrt-x": "★★☆☆☆",
  "valid-perfect-square": "★★☆☆☆",
  "nth-root-of-number": "★★★☆☆",
  "koko-eating-bananas": "★★★☆☆",
  "smallest-divisor-threshold": "★★★☆☆",
  "minimum-speed-arrive-on-time": "★★★☆☆",
  "minimum-days-make-bouquets": "★★★☆☆",
  "ship-packages-d-days": "★★★☆☆",
  "book-allocation-problem": "★★★☆☆",
  "split-array-largest-sum": "★★★★☆",
  "painters-partition-problem": "★★★★☆",
  "kth-element-two-sorted-arrays": "★★★★☆",
  "aggressive-cows": "★★★★★",
  "minimize-max-distance-gas-station": "★★★★★",
  "median-two-sorted-arrays": "★★★★★",
  "search-in-sorted-array": "★★☆☆☆",
};
const slug = (value) =>
  value
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
const escapeHtml = (value) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ],
  );
const list = document.querySelector("#question-list");
if (list) {
  const groups = [...new Set(questionData.map((item) => item[2]))];
  list.innerHTML = groups
    .map(
      (group) =>
        `<section class="question-group"><h2>${escapeHtml(group)}</h2>${questionData
          .filter((item) => item[2] === group)
          .map(
            (item, index) =>
              `<a class="question-row" href="questions/${item[1]}.html"><span>${String(index + 1).padStart(2, "0")}</span><strong>${escapeHtml(item[0])}</strong><small>${difficultyBySlug[item[1]]} · ${item[3]}</small><b>↗</b></a>`,
          )
          .join("")}</section>`,
    )
    .join("");
}
const search = document.querySelector("#question-search");
if (search && list)
  search.addEventListener("input", (event) => {
    const term = event.target.value.toLowerCase();
    [...list.querySelectorAll(".question-row")].forEach((row) => {
      row.hidden = !row.textContent.toLowerCase().includes(term);
    });
  });
