<div align="center">

<img src="./public/autoscene-mark.svg" alt="AutoScene Logo" width="80" height="80" />

# AutoScene UI Library

A standalone dark mode component library extracted from AutoScene for creative and video editing tools.

[![TypeScript](https://img.shields.io/badge/TypeScript-7.1-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-gold.svg?style=flat-square)](LICENSE)

[Live Demo](https://moongetsu.github.io/AutoScene-UI-Library/) • [Installation](#installation) • [Components](#components) • [Tokens](#design-tokens) • [Credits](#credits)

---

</div>

## Preview

![AutoScene UI Registry](docs/previews/registry-21st-overview.png)

---

## Overview

AutoScene UI is a collection of React components designed for dark interfaces, media workspaces, and video analysis tools. It was extracted directly from the open source [AutoScene](https://github.com/tcmmi/AutoScene) desktop application and rebuilt as an independent, framework-agnostic web library.

### Key Characteristics
* **Dark Surfaces**: Layered dark tones (`#050506` through `#202025`) suited for footage viewing and long editing sessions.
* **Frosted Borders and Overlays**: Subtle borders, backdrop blurs, and glass layers.
* **Warm Gold Accents**: High contrast indicators (`#e0b45c`) for active operations, selections, and focus rings.
* **Zero Desktop Coupling**: Runs in any standard modern web browser with React 18 or 19. The site answers the app's calls from a mock backend.

---

## Installation

Install the package via npm:

```bash
npm install @moongetsu/autoscene-ui @phosphor-icons/react
```

Or run the CLI to inspect and scaffold primitives:

```bash
npx @moongetsu/autoscene-ui add
```

### Usage

Import components into your React app:

```tsx
import { Button, Badge, Input, Switch, Slider, Tooltip } from "@moongetsu/autoscene-ui"
import "@moongetsu/autoscene-ui/styles.css"

export default function App() {
  return (
    <div className="p-8 flex flex-col gap-4">
      <Button variant="primary">Process Scene</Button>
      <Badge tone="accent">Ready</Badge>
    </div>
  )
}
```

---

## Components

The catalog lists 50 entries: 32 primitives and 18 feature components. It is one file, `src/registry/catalog.json`: the registry, the showcase counts, the command palette and the static pages all read it.

### Primitives

| Category | Components |
| :--- | :--- |
| **Buttons** | `Button` |
| **Toggles** | `Segmented`, `Switch`, `Checkbox`, `Slider` |
| **Inputs** | `Input`, `Field`, `Select` |
| **Feedback** | `Badge`, `Banner`, `Progress`, `ProgressRing`, `Skeleton`, `Kbd`, `Toaster`, `ErrorState` |
| **Overlays** | `Dialog`, `Sheet`, `DropdownMenu`, `ContextMenu`, `Tooltip`, `ContextArea`, `MenuActions` |
| **Cards & Media** | `Artwork`, `Hero`, `Shelf`, `EmptyState`, `VirtualGrid`, `SettingsGroup`, `SettingRow`, `PathText` |
| **Navigation** | `TopBar`, `Page`, `FilterBar` |

`Button` takes `busy`: it can't be pressed, and a spinner takes the place of its first icon, or stands in front of the label when it has none.

### Features

Whole parts of the app, listed under Features in the registry and in the showcase. They run on the library's mock backend with made-up data, and they stay in this repo: they aren't in the npm package.

| Where | Components |
| :--- | :--- |
| **Plugins** | `PluginArt`, `PluginCard`, `PluginsPage`, `PluginSettingsPage`, `UninstallDialog`, `WithdrawnBanner`, `CatalogCard`, `BrowseView` |
| **Player** | `DetailsPanel`, `CastTab`, `FileTab`, `TabBody`, `ShotHeader`, `PlayerKeysDialog` |
| **Library, Cast** | `ProjectCard`, `CharacterCard` |
| **Settings** | `HardwareGroup` |
| **Shell** | `FastScanNotice` |

`PluginFrame`, `PluginPageView` and `PlayerPicture` are not listed: they are a sandboxed frame and a video wrapper, and show nothing without the desktop app. The `/x/` routes of plugin pages, the `.asp` file handling and the rest of the Tauri glue stay out of this repo.

### Adding a component

1. Add one line to `src/registry/catalog.json`: its id, name, category, showcase section, description and file. A feature also names where it lives (`feature`).
2. Add its preview to `COMPONENT_DEMO_PREVIEWS` (`src/registry/component-previews.tsx`), or to `FEATURE_PREVIEWS` for a feature.
3. If the package should export it, add it to `src/index.ts` and to the entry's `exports`.

`src/registry/catalog.test.ts` fails when a file in `src/components/ui` has no entry, an entry has no preview, or an entry names an export the package doesn't have. Every entry gets its static page from `scripts/prerender-routes.mjs`.

### Syncing with the app

Most of `src/` mirrors the AutoScene app and can be copied over. These files are the library's own forks: **a sync must merge into them, never overwrite them.**

| File | Why it differs from the app |
| :--- | :--- |
| `ui/context-menu`, `ui/dialog`, `ui/sheet`, `ui/switch` | Built on the `@animate-ui` primitives |
| `ui/dropdown-menu` | The same, with the app's scrolling and collision padding merged in |
| `ui/slider`, `ui/tooltip` | The library's own motion and placement |
| `ui/toaster` | `CleanToastCapsule`, bottom right |
| `ui/button` | `motion.button`, `busy`, `cursor-pointer` |
| `ui/segmented` | Sliding pill (`layoutId`), `w-fit` |
| `brand/AutoSceneMark` | The `bare` look |
| `icons.ts` | Adds `Link` and `List` |
| `styles/tokens.css` | Its own `--ease-out` and `--ease-spring` |
| `styles/index.css`, `styles/base.css` | Tooltip keyframes; the page scrolls, its text can be selected, clickable things get the hand |
| `shell/AppShell`, `shell/AppMenu`, `router.tsx` | The `!isTauri` web shell, the `@animate-ui` menu root, the registry and showcase routes without plugin pages |

Library only, with nothing to sync: `ui/filter-bar`, `ui/skeleton`, `lib/motion.ts`, `shell/StandaloneShell`, `styles/library.css` (what the package ships), `src/registry` and `src/components/showcase`.

Copied files lose their em and en dashes, as `AGENTS.md` asks, so expect those lines in a diff against the app. `FastScanNotice` reads its still through `import.meta.env.BASE_URL`, since the site isn't served from the root.

### Footage stills

The pictures in `public/footage` are from open films and artwork under Creative Commons Attribution licences. A preview that shows one says whose it is. No studio art belongs in this repo: `FastScanNotice` stays on the Tears of Steel still with its credit, whatever the app shows there.

---

## Design Tokens

Key CSS tokens available in `src/styles/tokens.css`:

| Token | Value | Description |
| :--- | :--- | :--- |
| `--bg-inset` | `#050506` | Darkest background well |
| `--bg-canvas` | `#09090b` | Base application background |
| `--bg-panel` | `#111114` | Primary card and panel surface |
| `--bg-overlay` | `#202025` | Menus, popovers, and dialogs |
| `--accent` | `#e0b45c` | Warm gold accent color |
| `--fg-1` | `#f5f3ef` | Primary high contrast text |
| `--fg-2` | `#b4b1ac` | Muted secondary text |
| `--fg-3` | `#6d6a65` | Subtle captions and hints |
| `--line-hairline` | `rgba(255, 255, 255, 0.07)` | Translucent divider lines |

### Typography

| Family | Package | Usage |
| :--- | :--- | :--- |
| **Inter Variable** | `@fontsource-variable/inter` | Primary interface sans-serif for controls, buttons, forms, and labels |
| **Instrument Serif** | `@fontsource/instrument-serif` | Display serif for titles, card headers, and banners |
| **Geist Mono Variable** | `@fontsource-variable/geist-mono` | Monospace typeface for timecodes, counts, shortcuts, and code blocks |

---

## Development

Run the registry catalog and live documentation locally:

```bash
# Clone the repository
git clone https://github.com/moongetsu/AutoScene-UI-Library.git
cd AutoScene-UI-Library

# Install dependencies
npm install --legacy-peer-deps

# Start Vite dev server
npm run dev
```

Visit `http://localhost:5173/AutoScene-UI-Library/` to browse the registry and showcase pages.

---

## Credits & Acknowledgments

This library builds upon ideas and open source projects from the community:

* **[AutoScene](https://github.com/tcmmi/AutoScene)**: Core inspiration, visual identity, and upstream application created by [tcmmi](https://github.com/tcmmi).
* **[21st.dev](https://21st.dev)**: Design inspiration for the interactive component registry catalog layout and preview cards.
* **[animate-ui](https://github.com/animate-ui)**: Animation primitives, smooth layout transitions, and interactive physics.
* **[Radix UI](https://www.radix-ui.com/)**: Unstyled, accessible UI primitive foundations.
* **[Phosphor Icons](https://phosphoricons.com/)**: Clean, flexible icon family used across components.
* **[Sonner](https://sonner.emilkowal.ski/)**: Fast, opinionated toast engine powering the notification capsules.
* **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first styling architecture.

---

## License

MIT License. See [LICENSE](LICENSE) for details. Created by [Moongetsu](https://github.com/moongetsu) and derived from [AutoScene](https://github.com/tcmmi/AutoScene).
