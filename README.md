# Pokedex

A Pokémon search UI built on top of [Coveo Headless](https://docs.coveo.com/en/headless/latest/) with React, Vite, TypeScript and Tailwind CSS.

## Features

- Search box with type-ahead suggestions
- Multi-value facets for Type and Generation
- Result grid with pagination
- Detail page with image, base stats, abilities, height, weight, generation
- Direct linking via `/pokemon/:pokedexnumber`

## Stack

- Vite + React 19 + TypeScript
- `@coveo/headless` (controllers wired to React via a small `useControllerState` hook)
- React Router v7
- Tailwind CSS v3

## Getting started

```bash
npm install
cp .env.example .env.local
# edit .env.local and set your Coveo credentials
npm run dev
```

### Environment variables

Set these in `.env.local` (never commit this file):

| Variable                        | Description                                |
| ------------------------------- | ------------------------------------------ |
| `VITE_COVEO_ORGANIZATION_ID`    | Your Coveo organization ID                 |
| `VITE_COVEO_ACCESS_TOKEN`       | Coveo API key or search token (Search privilege) |

The fields `pokedexnumber`, `pokemontype`, `pokemongeneration`, `pokemonimage`, `pokemonspecies`, `pokemonheight`, `pokemonweight`, `pokemonabilities`, `pokemonhp`, `pokemonattack`, `pokemondefense`, `pokemonspatk`, `pokemonspdef`, `pokemonspeed` must be indexed; the two facet fields must also be facet-enabled in your Coveo organization.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — type-check and produce a production build
- `npm run preview` — preview the production build
- `npm run lint` — run ESLint
