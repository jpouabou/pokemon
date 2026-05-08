import type { Facet as HeadlessFacet } from '@coveo/headless';
import { useControllerState } from '../hooks/useController';

interface Props {
  controller: HeadlessFacet;
  title: string;
}

export function Facet({ controller, title }: Props) {
  const state = useControllerState(controller);

  if (!state.values.length && !state.hasActiveValues) {
    return null;
  }

  return (
    <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
      <header className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold tracking-wide uppercase text-slate-700">
          {title}
        </h3>
        {state.hasActiveValues && (
          <button
            type="button"
            onClick={() => controller.deselectAll()}
            className="text-xs text-pokemon-blue hover:underline"
          >
            Clear
          </button>
        )}
      </header>

      <ul className="space-y-1.5">
        {state.values.map((value) => {
          const checked = value.state === 'selected';
          return (
            <li key={value.value}>
              <label className="flex items-center justify-between gap-2 cursor-pointer group">
                <span className="flex items-center gap-2 min-w-0">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => controller.toggleSelect(value)}
                    className="h-4 w-4 rounded border-slate-300 text-pokemon-blue focus:ring-pokemon-blue"
                  />
                  <span
                    className={`truncate text-sm capitalize ${
                      checked ? 'text-slate-900 font-medium' : 'text-slate-700'
                    } group-hover:text-slate-900`}
                  >
                    {value.value}
                  </span>
                </span>
                <span className="text-xs text-slate-400 tabular-nums">
                  {value.numberOfResults}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
