# AdalatSetu (अदालत सेतु)

**Smart tools for judicial work.** AdalatSetu collects accurate, statute-backed calculators and
utilities for courts, starting with Madhya Pradesh.

## Tools

| Tool                                             | Statute                                                                                           |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| Stamp Calculator (Impounding of Document) u/s 35 | Indian Stamp Act, 1899 as amended by the Indian Stamp (Madhya Pradesh Second Amendment) Act, 2025 |

### Stamp Calculator u/s 35

For an insufficiently stamped instrument impounded under Section 33 and admitted under
clause (a) of the proviso to Section 35:

```
Deficit  (A) = Market value × Rate% − Stamp duty paid
Months   (M) = months from the date of execution; the execution day counts and any part of a month counts as a full month
Penalty  (B) = A × 1% × M, never more than A
Interest (C) = A × 1% × M, with no upper limit
Total        = A + B + C        (every amount rounded up to the next rupee)
```

It also shows the step-by-step working, drafts an order-sheet paragraph in English and Hindi,
prints an A4 report, shares a summary on WhatsApp and saves calculations to history.

## Tech stack

- [React 19](https://react.dev) with [Vite](https://vite.dev)
- [React Router](https://reactrouter.com) for pages
- Plain CSS with design tokens (light and dark themes)
- [Vitest](https://vitest.dev) for unit tests, [oxlint](https://oxc.rs) for linting, [Prettier](https://prettier.io) for formatting
- No backend: saved history lives in the browser's `localStorage`

## Getting started

Requires Node.js 20 or newer.

```bash
npm install
npm run dev        # start the dev server at http://localhost:5173
```

| Script               | Purpose                            |
| -------------------- | ---------------------------------- |
| `npm run dev`        | Development server with hot reload |
| `npm run build`      | Production build into `dist/`      |
| `npm run preview`    | Serve the production build locally |
| `npm test`           | Run unit tests once                |
| `npm run test:watch` | Run tests in watch mode            |
| `npm run lint`       | Lint the code                      |
| `npm run format`     | Format all files with Prettier     |

## Project structure

```
src/
├── main.jsx                     # Entry point: global styles, theme, <App />
├── app/                         # Application shell
│   ├── App.jsx                  # Providers and routes
│   └── layout/                  # AppShell, Sidebar, TopBar, Logo
├── config/
│   ├── routes.js                # Every URL in one place (ROUTES, ROUTE_PATTERNS)
│   └── site.js                  # Name, Hindi name, tagline
├── features/                    # App-wide features, each with a public index.js
│   ├── history/                 # Saved calculations: service + RecentCalculations
│   └── theme/                   # Light/dark theme: useTheme + ThemeToggle
├── pages/                       # One folder per route: HomePage, HistoryPage, AboutPage, ToolPage, NotFoundPage
├── shared/                      # Generic, reusable code with no app-specific knowledge
│   ├── hooks/                   # useDocumentTitle
│   ├── lib/                     # Pure helpers: dates, currency, numberToWords, storage, clipboard, share
│   ├── styles/                  # tokens.css (design tokens, themes) and base.css
│   └── ui/                      # UI kit: Button, Card, Field, AmountInput, Tabs, Toast, PageHeader, …
└── tools/
    ├── registry.js              # Tool and category list; drives navigation, search and routing
    └── stamp-penalty-s35/
        ├── index.js             # Tool definition (name, category, lazy component)
        ├── StampPenaltyTool.jsx # Tool page
        ├── components/          # UI specific to this tool
        ├── content/             # Statute text and reference data
        ├── hooks/               # Form state
        └── logic/               # Pure calculation and drafting functions, with tests
```

### Dependency rules

Imports flow in one direction: `app` → `pages` → `features` / `tools` → `shared`.

- `shared/` never imports from the rest of the app.
- A feature is imported only through its `index.js` (e.g. `import { RecentCalculations } from '@/features/history'`).
- URLs are always built with `ROUTES` from `@/config/routes`, never typed as strings.

### Adding a new tool

1. Create `src/tools/<tool-id>/` with an `index.js` that exports the tool definition
   (copy `stamp-penalty-s35/index.js` as a template).
2. Put calculations in `logic/` as pure functions, with `*.test.js` tests next to them.
3. Register the tool in `src/tools/registry.js`, adding a category there if needed.

The sidebar, the home page, search and the `/tools/<tool-id>` route pick it up automatically.

### Conventions

- Components use only the CSS variables in `src/shared/styles/tokens.css`, so theming happens in one place.
- Each component keeps its styles in a CSS file next to it, with BEM-style class names (`block__element--modifier`).
- Business logic never lives in components: it goes in a tool's `logic/` or in `shared/lib/`.
- Data access goes through services (`features/history/services`), so a backend can be added later without touching components.
- Import from `src` with the `@/` alias, e.g. `import { formatINR } from '@/shared/lib/currency'`.
- Run `npm run format` and `npm run lint` before committing.

## Deployment

The repo includes `netlify.toml`: build command `npm run build`, publish directory `dist`, and
a redirect so client-side routes work on refresh.

## Disclaimer

AdalatSetu is an aid to calculation and drafting. It is not legal advice. Verify every figure
against the statute and the facts of the case before relying on it.
