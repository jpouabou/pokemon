import type { PokemonResultRaw } from '../coveo/api';

export const TYPE_COLORS: Record<string, string> = {
  normal: 'bg-stone-300 text-stone-900',
  fire: 'bg-orange-500 text-white',
  water: 'bg-blue-500 text-white',
  electric: 'bg-yellow-400 text-yellow-900',
  grass: 'bg-emerald-500 text-white',
  ice: 'bg-cyan-300 text-cyan-900',
  fighting: 'bg-red-700 text-white',
  poison: 'bg-purple-600 text-white',
  ground: 'bg-amber-600 text-white',
  flying: 'bg-indigo-300 text-indigo-900',
  psychic: 'bg-pink-500 text-white',
  bug: 'bg-lime-500 text-lime-950',
  rock: 'bg-yellow-700 text-white',
  ghost: 'bg-violet-700 text-white',
  dragon: 'bg-indigo-700 text-white',
  dark: 'bg-zinc-800 text-white',
  steel: 'bg-slate-400 text-slate-900',
  fairy: 'bg-pink-300 text-pink-900',
};

export function typeBadge(type: string): string {
  return TYPE_COLORS[type.toLowerCase()] ?? 'bg-slate-300 text-slate-900';
}

export function asArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String);
  if (value === undefined || value === null || value === '') return [];
  return [String(value)];
}

export function formatPokedexNumber(value: unknown): string {
  if (value === undefined || value === null || value === '') return '???';
  const num = Number(value);
  if (Number.isNaN(num)) return String(value);
  return `#${String(num).padStart(3, '0')}`;
}

export function pokedexId(raw: PokemonResultRaw): string | null {
  const v = raw.pokedexnumber;
  if (v === undefined || v === null || v === '') return null;
  return String(v);
}
