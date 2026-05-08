import type { ResultList as HeadlessResultList, Pager } from '@coveo/headless';
import { useControllerState } from '../hooks/useController';
import { PokemonCard } from './PokemonCard';

interface Props {
  resultList: HeadlessResultList;
  pager: Pager;
}

export function ResultList({ resultList, pager }: Props) {
  const state = useControllerState(resultList);
  const pagerState = useControllerState(pager);

  if (state.isLoading && state.results.length === 0) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="aspect-[3/4] bg-white border border-slate-200 rounded-2xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (state.firstSearchExecuted && state.results.length === 0) {
    return (
      <div className="text-center py-16 text-slate-500">
        <p className="text-lg">No Pokemon match your search.</p>
        <p className="text-sm mt-2">Try removing some filters.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {state.results.map((result) => (
          <PokemonCard key={result.uniqueId} result={result} />
        ))}
      </div>

      {pagerState.currentPages.length > 1 && (
        <nav className="flex items-center justify-center gap-2 mt-8">
          <button
            type="button"
            onClick={() => pager.previousPage()}
            disabled={!pagerState.hasPreviousPage}
            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 disabled:opacity-40 hover:bg-slate-50"
          >
            ←
          </button>
          {pagerState.currentPages.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => pager.selectPage(p)}
              className={`min-w-[36px] px-2 py-1.5 rounded-lg text-sm font-medium ${
                p === pagerState.currentPage
                  ? 'bg-pokemon-blue text-white'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {p}
            </button>
          ))}
          <button
            type="button"
            onClick={() => pager.nextPage()}
            disabled={!pagerState.hasNextPage}
            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 disabled:opacity-40 hover:bg-slate-50"
          >
            →
          </button>
        </nav>
      )}
    </>
  );
}
