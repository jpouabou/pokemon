import { useState } from 'react';
import {
  buildFieldSortCriterion,
  buildRelevanceSortCriterion,
  SortOrder,
  type Sort,
  type SortCriterion,
} from '@coveo/headless';
import { useControllerState } from '../hooks/useController';

const POKEMON_OPTIONS: { id: string; label: string; criterion: SortCriterion }[] = [
  { id: 'relevance', label: 'Relevance', criterion: buildRelevanceSortCriterion() },
  {
    id: 'pokedex-asc',
    label: 'Pokedex Number',
    criterion: buildFieldSortCriterion('pokedexnumber', SortOrder.Ascending),
  },
  {
    id: 'hp-desc',
    label: 'HP (highest)',
    criterion: buildFieldSortCriterion('pokemonhp', SortOrder.Descending),
  },
  {
    id: 'attack-desc',
    label: 'Attack (highest)',
    criterion: buildFieldSortCriterion('pokemonattack', SortOrder.Descending),
  },
];

const JOCKEY_OPTIONS = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'new', label: 'New Arrivals' },
  { id: 'best', label: 'Best Sellers' },
];

interface PokemonSortProps {
  mode: 'pokemon';
  controller: Sort;
}

interface JockeySortProps {
  mode: 'jockey';
}

type Props = PokemonSortProps | JockeySortProps;

export function SortDropdown(props: Props) {
  if (props.mode === 'pokemon') {
    return <PokemonSort controller={props.controller} />;
  }
  return <JockeySort />;
}

function PokemonSort({ controller }: { controller: Sort }) {
  useControllerState(controller);
  const active =
    POKEMON_OPTIONS.find((o) => controller.isSortedBy(o.criterion))?.id ?? 'relevance';

  return (
    <Shell value={active}
      onChange={(id) => {
        const opt = POKEMON_OPTIONS.find((o) => o.id === id);
        if (opt) controller.sortBy(opt.criterion);
      }}
      options={POKEMON_OPTIONS.map(({ id, label }) => ({ id, label }))}
    />
  );
}

function JockeySort() {
  const [value, setValue] = useState('featured');
  return <Shell value={value} onChange={setValue} options={JOCKEY_OPTIONS} />;
}

interface ShellProps {
  value: string;
  onChange: (id: string) => void;
  options: { id: string; label: string }[];
}

function Shell({ value, onChange, options }: ShellProps) {
  return (
    <label className="flex items-center gap-2 text-sm text-slate-600">
      <span className="hidden sm:inline">Sort:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-slate-800 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-300 cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}
