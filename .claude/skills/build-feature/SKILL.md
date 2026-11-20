---
name: build-feature
description: Build a feature in this repo from a task description: code, unit test, story and (for pages) an e2e test, then run verify, fix what you broke and report. Use when asked to build, add or implement a page or component.
---

# Build a feature

Follow these steps in order.

1. **Read the task.** Understand exactly what is being asked. Build only that.
2. **Read `CLAUDE.md`.** Follow the project map and conventions it describes.
3. **Write the code**, plus the tests that ship with it:
   - a unit test (`*.test.tsx`, Testing Library)
   - a story (`*.stories.tsx`)
   - for pages, an e2e test in `e2e/`
4. **Run `npm run verify -- --json`.**
5. **Fix what you broke.** Read the failures, change the code or tests, and run verify again. Leave failures you did not cause alone.
6. **Report.** Say what you built, which files you added or changed, and what verify reported.
