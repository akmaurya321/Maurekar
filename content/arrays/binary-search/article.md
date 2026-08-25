# Intro to Binary Search

> This is the complete beginner topic. The code examples and the interactive dry run are connected to `dsa/binary-search/content/visual.json`.

## What is Binary Search?

Binary Search is a searching technique for a **sorted** array. Instead of checking every value from left to right, it inspects the middle value and removes the half that cannot contain the target. The algorithm works because sorted order gives us a reliable answer to one question: should we continue left or right?

> **The key condition:** the input must already be sorted. Without that order, discarding half the array could discard the answer too.

## Why do we need it?

A linear search may inspect every item, which takes $O(n)$ time. Binary Search makes the problem smaller after every comparison. In a million-item sorted array, a linear search may need a million checks, while Binary Search needs roughly twenty.

This difference matters when searching large indexes, dictionaries, timestamps, version numbers, or any data that is already ordered. Sorting is not free, so in a real application ask whether the data will be searched repeatedly. If it is, sorting once and searching many times can be a useful trade-off.

## Intuition

Imagine searching for a word in a dictionary. You do not start at page one. You open near the middle, compare the word you see with the word you want, and choose the correct half. Each decision removes many impossible pages.

Binary Search applies that same idea to indexes. `low` and `high` describe the only range where the answer can still be. `mid` is our next question. The important habit is to keep the range inclusive and update it past the middle value.

## Preconditions and loop idea

Before starting, confirm two things: the array is sorted in ascending order and the target is comparable with its elements. During the loop, the invariant is simple: **if the target exists, it is somewhere between `low` and `high`, inclusive**.

When `low > high`, the range is empty. At that point every possible index has been ruled out and returning `-1` is correct.

## How it works

1. Set `low` to the first index and `high` to the last index.
2. While the range is valid, calculate `mid`, the index halfway between them.
3. Compare `array[mid]` with the target.
4. If they match, return `mid`.
5. If the middle value is smaller, move `low` to `mid + 1`.
6. Otherwise move `high` to `mid - 1`.
7. If the loop ends, the target is not present, so return `-1`.

## Example

For `[2, 5, 8, 12, 16, 23, 38]` and target `23`, the first range is indexes `0` through `6`. The middle index is `3`, whose value is `12`. Because `12 < 23`, indexes `0` through `3` cannot contain the target. The next range is `4` through `6`; its middle is index `5`, whose value is `23`. The search succeeds.

## A small trace table

| Round | Low | Mid | High | Middle value | Decision          |
| ----- | --- | --- | ---- | ------------ | ----------------- |
| 1     | 0   | 3   | 6    | 12           | Search right half |
| 2     | 4   | 5   | 6    | 23           | Target found      |

## Java implementation

The code below is displayed for learning. The visualizer does not compile or execute it. It reads predefined snapshots from `visual.json`, then shows the Java line and diagram that belong to each snapshot.

The overflow-safe middle calculation, `low + (high - low) / 2`, is preferred over `(low + high) / 2` when indexes may be very large. Both produce the same result for ordinary classroom inputs.

## Detailed dry run

Use **Next** to move one meaningful operation at a time. First watch the range become valid, then watch `mid` move from index `3` to index `5`. The green Java line, description, and array state change together. Try predicting the next line before pressing the button.

The **Previous** button is useful when a comparison feels too quick. Use **Reset** to replay the complete lesson, and **Play** when you already understand the sequence and want to review it as an animation. This is a simulation of the algorithm's logic, not a Java runtime.

## Complexity

| Measure | Cost        | Why                                                           |
| ------- | ----------- | ------------------------------------------------------------- |
| Time    | $O(\log n)$ | The remaining range is halved after each comparison.          |
| Space   | $O(1)$      | Only three index variables are used in the iterative version. |

The logarithm comes from repeatedly dividing the input by two. After $k$ rounds, the remaining range is approximately $n / 2^k$. It becomes one item when $2^k$ is about $n$, so $k$ is about $\log_2 n$.

## Common mistakes

- Applying Binary Search to an unsorted array.
- Using `while (low < high)` and accidentally skipping the final candidate.
- Updating the range without moving past `mid`, which can create an infinite loop.
- Confusing an element value with its index.
- Returning the first match when the problem actually asks for the first or last match among duplicates.
- Forgetting that an empty array starts with `high = -1`.

## Interview notes

Start by stating the precondition: the input is sorted. Then explain the invariant and the three possible comparison outcomes. Interviewers often change one detail, such as asking for a lower bound, a rotated array, or the first occurrence of a duplicate. The same range-shrinking idea still applies, but the answer is recorded before continuing.

In production code, calculate the middle as `low + (high - low) / 2` to avoid integer overflow. Also clarify whether the expected result is an index, a boolean, an insertion position, or `-1` when the target is missing.

## Practice problems

- Return the first and last position of a value with duplicates.
- Find the insertion position for a target.
- Search for a value in a rotated sorted array.
- Find the square root of an integer using a numeric search range.
- Find the minimum speed or capacity that satisfies a constraint.
