import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSearchControllers } from '../coveo/engine';
import { useControllerState } from '../hooks/useController';
import { SearchBox } from '../components/SearchBox';
import { Facet } from '../components/Facet';
import { ResultList } from '../components/ResultList';

export function SearchPage() {
  const controllers = getSearchControllers();
  const resultListState = useControllerState(controllers.resultList);

  useEffect(() => {
    if (!controllers.engine.state.search.response.searchUid) {
      controllers.engine.executeFirstSearch();
    }
  }, [controllers.engine]);

  return (
    <div className="min-h-screen">
      <header className="bg-gradient-to-r from-pokemon-red via-rose-500 to-pokemon-yellow shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-4">
          <Link to="/" className="text-white font-display text-lg sm:text-xl tracking-wider drop-shadow">
            POKEDEX
          </Link>
          <SearchBox controller={controllers.searchBox} />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        <aside className="space-y-4">
          <Facet controller={controllers.typeFacet} title="Type" />
          <Facet controller={controllers.generationFacet} title="Generation" />
        </aside>

        <section>
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-800">
              {resultListState.firstSearchExecuted
                ? `${controllers.engine.state.search.response.totalCountFiltered.toLocaleString()} Pokemon`
                : 'Loading...'}
            </h2>
          </div>
          <ResultList
            resultList={controllers.resultList}
            pager={controllers.pager}
          />
        </section>
      </main>
    </div>
  );
}
