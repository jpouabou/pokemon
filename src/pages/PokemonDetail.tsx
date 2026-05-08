import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import type { Result } from '@coveo/headless';
import {
  searchPokemonByPermanentId,
  type PokemonResultRaw,
} from '../coveo/api';
import { PokemonImage } from '../components/PokemonImage';
import {
  asArray,
  formatPokedexNumber,
  typeBadge,
} from '../utils/pokemon';

const STAT_LABELS: { key: keyof PokemonResultRaw; label: string; max: number }[] = [
  { key: 'pokemonhp', label: 'HP', max: 255 },
  { key: 'pokemonattack', label: 'Attack', max: 200 },
  { key: 'pokemondefense', label: 'Defense', max: 250 },
  { key: 'pokemonspatk', label: 'Sp. Atk', max: 200 },
  { key: 'pokemonspdef', label: 'Sp. Def', max: 250 },
  { key: 'pokemonspeed', label: 'Speed', max: 200 },
];

interface NavState {
  result?: Result;
}

export function PokemonDetail() {
  const { permanentid } = useParams<{ permanentid: string }>();
  const location = useLocation();
  const navResult = (location.state as NavState | null)?.result ?? null;

  const [result, setResult] = useState<{ title: string; raw: PokemonResultRaw } | null>(navResult);
  const [loading, setLoading] = useState(!navResult);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (navResult || !permanentid) return;
    let cancelled = false;
    setLoading(true);
    searchPokemonByPermanentId(permanentid)
      .then((res) => {
        if (cancelled) return;
        if (!res) {
          setError('Pokemon not found.');
        } else {
          setResult(res);
        }
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : String(err));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [permanentid, navResult]);

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-24 text-slate-500">Loading Pokemon…</div>
      </Layout>
    );
  }

  if (error || !result) {
    return (
      <Layout>
        <div className="text-center py-24">
          <p className="text-slate-700 text-lg">{error ?? 'Pokemon not found.'}</p>
          <Link
            to="/"
            className="inline-block mt-6 px-5 py-2 rounded-full bg-pokemon-blue text-white font-medium"
          >
            Back to search
          </Link>
        </div>
      </Layout>
    );
  }

  const raw = result.raw;
  const types = asArray(raw.pokemontype);
  const abilities = asArray(raw.pokemonabilities);
  const totalStats = STAT_LABELS.reduce(
    (sum, { key }) => sum + (Number(raw[key]) || 0),
    0,
  );

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 mb-4"
        >
          ← Back to search
        </Link>

        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-gradient-to-br from-slate-100 to-slate-200 p-8 flex items-center justify-center relative">
              <span className="absolute top-4 right-6 text-sm font-mono text-slate-500 tabular-nums">
                {formatPokedexNumber(raw.pokedexnumber)}
              </span>
              <PokemonImage
                src={raw.pokemonimage}
                alt={result.title}
                className="w-full max-w-xs object-contain drop-shadow-2xl"
              />
            </div>

            <div className="p-6 sm:p-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 capitalize">
                {result.title}
              </h1>
              {raw.pokemonspecies && (
                <p className="text-slate-500 mt-1 capitalize">
                  {raw.pokemonspecies}
                </p>
              )}

              <div className="mt-4 flex flex-wrap gap-2">
                {types.map((t) => (
                  <span
                    key={t}
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${typeBadge(t)}`}
                  >
                    {t}
                  </span>
                ))}
              </div>

              <dl className="mt-6 grid grid-cols-2 gap-4">
                <Meta label="Height" value={formatHeight(raw.pokemonheight)} />
                <Meta label="Weight" value={formatWeight(raw.pokemonweight)} />
                <Meta
                  label="Generation"
                  value={raw.pokemongeneration ? String(raw.pokemongeneration) : '—'}
                />
                <Meta
                  label="Abilities"
                  value={
                    abilities.length
                      ? abilities.map((a) => titleCase(a)).join(', ')
                      : '—'
                  }
                />
              </dl>
            </div>
          </div>

          <div className="border-t border-slate-200 p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Base Stats
            </h2>
            <div className="space-y-2">
              {STAT_LABELS.map(({ key, label, max }) => {
                const v = Number(raw[key]) || 0;
                const pct = Math.min(100, (v / max) * 100);
                return (
                  <div key={key} className="grid grid-cols-[110px_60px_1fr] items-center gap-3">
                    <span className="text-sm text-slate-600">{label}</span>
                    <span className="text-sm font-mono tabular-nums text-slate-900">
                      {v}
                    </span>
                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${statBarColor(v, max)}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
              <div className="grid grid-cols-[110px_60px_1fr] items-center gap-3 pt-2 border-t border-slate-100 mt-2">
                <span className="text-sm font-semibold text-slate-700">Total</span>
                <span className="text-sm font-mono tabular-nums font-bold text-slate-900">
                  {totalStats}
                </span>
                <span />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="bg-gradient-to-r from-pokemon-red via-rose-500 to-pokemon-yellow shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <Link to="/" className="text-white font-display text-lg sm:text-xl tracking-wider drop-shadow">
            POKEDEX
          </Link>
        </div>
      </header>
      {children}
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-slate-400 font-semibold">
        {label}
      </dt>
      <dd className="text-slate-800 mt-0.5">{value}</dd>
    </div>
  );
}

function formatHeight(v: unknown): string {
  if (v === undefined || v === null || v === '') return '—';
  const n = Number(v);
  if (Number.isNaN(n)) return String(v);
  return `${(n / 10).toFixed(1)} m`;
}

function formatWeight(v: unknown): string {
  if (v === undefined || v === null || v === '') return '—';
  const n = Number(v);
  if (Number.isNaN(n)) return String(v);
  return `${(n / 10).toFixed(1)} kg`;
}

function titleCase(s: string): string {
  return s.replace(/(^|[\s-])\w/g, (m) => m.toUpperCase()).replace(/-/g, ' ');
}

function statBarColor(v: number, max: number): string {
  const pct = (v / max) * 100;
  if (pct < 25) return 'bg-red-400';
  if (pct < 50) return 'bg-orange-400';
  if (pct < 75) return 'bg-emerald-400';
  return 'bg-emerald-600';
}
