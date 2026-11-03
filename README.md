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
* **Zero Desktop Coupling**: Runs in any standard modern web browser with React 18 or 19.

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

The library contains 27 core components organized by functional area:

| Category | Components |
| :--- | :--- |
| **Buttons & Controls** | `Button`, `Segmented`, `Switch`, `Slider` |
| **Inputs & Data** | `Input`, `Field`, `Select`, `FilterBar` |
| **Feedback & Badges** | `Badge`, `Progress`, `Skeleton`, `Kbd`, `Toaster` |
| **Overlays & Dialogs** | `Dialog`, `Sheet`, `DropdownMenu`, `ContextMenu`, `Tooltip`, `ContextArea`, `MenuActions` |
| **Media & Cards** | `Artwork`, `Shelf`, `Hero`, `EmptyState`, `VirtualGrid` |
| **Navigation & Layout** | `TopBar`, `Page`, `AutoSceneMark` |

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
