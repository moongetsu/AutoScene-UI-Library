# AGENTS.md — AutoScene UI Library Guidelines

Instructions and operational constraints for AI agents (Antigravity, Cursor, Copilot, etc.) working on the `AutoScene-UI-Library` repository.

---

## 1. Sync With Main AutoScene App

- **Bidirectional Parity**: Whenever UI components, styles, design tokens, or icons are updated or added in the upstream `tcmmi/AutoScene` application (`/app/src/components/ui/`, `/app/src/styles/`, etc.), those exact changes must be mirrored into this repository (`AutoScene-UI-Library`).
- **Clean Extraction**: Never copy Tauri/Cargo/Rust desktop-specific bindings (`crates/`, `src-tauri/`) into this repository. This repository is strictly standalone React 19 + TypeScript + Vite + Tailwind CSS.
- **Do Not Break Standalone Mode**: Keep the `!isTauri` check in `src/components/shell/AppShell.tsx` intact so the web registry and showcase continue to render cleanly in standard browsers.

---

## 2. Pull Request (PR) Workflow — Strict Rule

- **No Direct Pushes to `main`**: All code modifications, component additions, and refactors MUST be submitted via a **Pull Request (PR)** on a dedicated branch (e.g. `feature/...` or `fix/...`).
- **Never push directly to `main`** unless the user explicitly commands: *"push directly to main"* or gives an explicit exception.
- **PR Format Requirement**: All PRs must strictly follow the standard 3-section format:
  ```markdown
  ## What
  [Concise 1-2 sentence description of what this PR introduces or fixes]

  ## Why
  [Plain explanation of the issue, UX friction, or technical motivation]

  ## How
  • [Bullet point detailing specific changes]
  • [Bullet point detailing specific changes]
  ```

---

## 3. Commit Message Style

All commits must follow plain, clear language with action prefixes:
- `(add) <description>`: Adding new components, assets, or static routes.
- `(update) <description>`: Modifying existing components, refactoring, or updating configs.
- `(remove) <description>`: Deleting dead code, obsolete assets, or unwanted badges.
- `(fix) <description>`: Fixing bugs, imports, or broken styles.

Never use buzzwords, corporate marketing phrasing, or artificial hype. Keep summaries plain, concise, and accurate.

---

## 4. Verification & Testing Constraints

- **Type Safety**: Always run `npx tsc --noEmit` after making code changes to verify type safety.
- **No Premature Builds**: Do NOT run `npm run build` or build scripts until the user explicitly requests a build or asks to push to production. Keep the dev server running for rapid user inspection (`npm run dev`).
- **Prerendering Script**: When a build IS requested, ensure `node scripts/prerender-routes.mjs` runs so that all 28+ components and showcase tabs generate their physical static HTML files for Discord/X Open Graph scrapers on GitHub Pages.

---

## 5. UI & Styling Rules

- **Cursor Pointer**: All interactive/clickable elements (`button`, `a`, `[role="button"]`, `[role="tab"]`) must have `cursor: pointer`.
- **Phosphor Icons Only**: Use Phosphor icons from `@/components/icons`. Never introduce generic emoji, sparkles, magic wands, or decorative AI clichés.
- **Authors & Credits**: Maintain credits for both **Moongetsu** and **tcmmi** in the sidebars and footers.
