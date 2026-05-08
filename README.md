# Pokedex

A Pokémon search UI built on top of [Coveo Headless](https://docs.coveo.com/en/headless/latest/) with React, Vite, TypeScript and Tailwind CSS. Includes a "Jockey Catalog" demo mode that re-skins the entire UI as an apparel storefront.

## Features

- Search box with type-ahead suggestions
- Multi-value facets for Type and Generation
- Sort dropdown (Relevance, Pokedex Number, HP, Attack)
- Result grid with pagination
- Detail page with large image, all base stats, abilities, height, weight, species, generation
- Deep linking via `/pokemon/:permanentid` (works on hard refresh too)
- Catalog mode toggle in the header — switch between Pokémon and a mocked Jockey product catalog (cosmetic)

## Stack

- Vite + React 19 + TypeScript
- `@coveo/headless` v3 (controllers wired to React via a small `useControllerState` hook)
- React Router v7
- Tailwind CSS v3

## Prerequisites

- Node.js `^20.19` or `^22.13` or `>=24`
- A Coveo organization with a Pokémon source indexed (see field requirements below)

## Getting started

```bash
npm install
cp .env.example .env.local
# edit .env.local and set your Coveo credentials
npm run dev
```

The dev server runs on `http://localhost:5173`.

## Environment variables

Set these in `.env.local` (never commit this file — it's gitignored):

| Variable                     | Description                                       |
| ---------------------------- | ------------------------------------------------- |
| `VITE_COVEO_ORGANIZATION_ID` | Your Coveo organization ID                        |
| `VITE_COVEO_ACCESS_TOKEN`    | Coveo API key or search token (Search privilege)  |

For Vercel deployments, add the same two variables in **Project Settings → Environment Variables**.

## Coveo index requirements

Each Pokémon document must expose these fields (all standard `string` / `number` fields):

`permanentid`, `pokedexnumber`, `pokemontype`, `pokemongeneration`, `pokemonimage`, `pokemonspecies`, `pokemonheight`, `pokemonweight`, `pokemonabilities`, `pokemonhp`, `pokemonattack`, `pokemondefense`, `pokemonspatk`, `pokemonspdef`, `pokemonspeed`.

Additional flags to set in the Coveo admin console:

- `pokemontype` and `pokemongeneration` must be **facet-enabled**.
- `pokedexnumber`, `pokemonhp`, `pokemonattack` must be **sortable** for the sort dropdown.
- The app applies a constant query (`@pokedexnumber`) so any document missing a Pokédex number is filtered out automatically.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — type-check and produce a production build (output in `dist/`)
- `npm run preview` — preview the production build
- `npm run lint` — run ESLint

## Project structure

```
src/
  coveo/        engine + controllers (singleton), config, REST helper
  hooks/        useControllerState — useSyncExternalStore for any Coveo controller
  components/   SearchBox, Facet, ResultList, PokemonCard, PokemonImage,
                SortDropdown, ModeToggle, StaticFacet, JockeyCard
  pages/        SearchPage, PokemonDetail
  state/        ModeContext (catalog mode toggle, localStorage persisted)
  data/         jockey.ts — static facets/products for the Jockey demo mode
  utils/        small formatters and type-color helpers
public/
  products/     local product images used by the Jockey catalog mockup
vercel.json     SPA rewrite so deep links resolve in production
```

## Deployment

The repo includes a `vercel.json` with the SPA fallback rewrite. Connect the repo on [vercel.com](https://vercel.com), set the two `VITE_COVEO_*` env vars in the project settings, and every push to `main` will auto-deploy.

## Jockey demo mode

The header has a subtle `View as: Pokemon · Jockey` toggle (persisted in `localStorage` under `catalog-mode`). In Jockey mode the page transforms entirely:

- Header changes to `JOCKEY CATALOG` with a navy gradient
- Type / Generation facets become Fabrication / Collection (hardcoded values)
- Result grid renders 21 mock apparel products from `public/products/`
- Sort dropdown shows storefront-style options (Featured, Price, etc.)

Jockey mode is purely cosmetic — none of the facets, search, or sort actually filter in that mode.
