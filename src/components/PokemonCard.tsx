import { Link } from 'react-router-dom';
import type { Result } from '@coveo/headless';
import type { PokemonResultRaw } from '../coveo/api';
import { PokemonImage } from './PokemonImage';
import {
  asArray,
  formatPokedexNumber,
  permanentId,
  typeBadge,
} from '../utils/pokemon';

interface Props {
  result: Result;
}

export function PokemonCard({ result }: Props) {
  const raw = result.raw as PokemonResultRaw;
  const pid = permanentId(raw);
  const types = asArray(raw.pokemontype);

  const card = (
    <article className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all overflow-hidden h-full flex flex-col">
      <div className="aspect-square bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center relative">
        <span className="absolute top-2 right-3 text-xs font-mono text-slate-400 tabular-nums">
          {formatPokedexNumber(raw.pokedexnumber)}
        </span>
        <PokemonImage
          src={raw.pokemonimage}
          alt={result.title}
          className="w-3/4 h-3/4 object-contain group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-slate-900 capitalize text-base truncate">
          {result.title}
        </h3>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {types.map((t) => (
            <span
              key={t}
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${typeBadge(t)}`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </article>
  );

  if (!pid) return card;

  return (
    <Link
      to={`/pokemon/${encodeURIComponent(pid)}`}
      state={{ result }}
      className="block h-full"
    >
      {card}
    </Link>
  );
}
