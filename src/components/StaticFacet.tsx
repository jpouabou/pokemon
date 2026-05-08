import type { JockeyFacetValue } from '../data/jockey';

interface Props {
  title: string;
  values: JockeyFacetValue[];
}

export function StaticFacet({ title, values }: Props) {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
      <header className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold tracking-wide uppercase text-slate-700">
          {title}
        </h3>
      </header>

      <ul className="space-y-1.5">
        {values.map((v) => (
          <li key={v.value}>
            <label className="flex items-center justify-between gap-2 cursor-pointer group">
              <span className="flex items-center gap-2 min-w-0">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-slate-700 focus:ring-slate-400"
                />
                <span className="truncate text-sm text-slate-700 group-hover:text-slate-900">
                  {v.value}
                </span>
              </span>
              <span className="text-xs text-slate-400 tabular-nums">
                {v.numberOfResults.toLocaleString()}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
}
