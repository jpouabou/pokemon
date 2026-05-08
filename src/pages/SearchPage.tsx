import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSearchControllers } from '../coveo/engine';
import { useControllerState } from '../hooks/useController';
import { useMode } from '../state/ModeContext';
import { SearchBox } from '../components/SearchBox';
import { Facet } from '../components/Facet';
import { ResultList } from '../components/ResultList';
import { StaticFacet } from '../components/StaticFacet';
import { JockeyCard } from '../components/JockeyCard';
import { ModeToggle } from '../components/ModeToggle';
import {
  JOCKEY_COLLECTIONS,
  JOCKEY_FABRICATIONS,
  JOCKEY_PRODUCTS,
  JOCKEY_TOTAL_PRODUCTS,
} from '../data/jockey';

export function SearchPage() {
  const { mode } = useMode();
  const controllers = getSearchControllers();
  const resultListState = useControllerState(controllers.resultList);

  useEffect(() => {
    if (!controllers.engine.state.search.response.searchUid) {
      controllers.engine.executeFirstSearch();
    }
  }, [controllers.engine]);

  const isJockey = mode === 'jockey';
  const headerTitle = isJockey ? 'JOCKEY CATALOG' : 'POKEDEX';
  const headerGradient = isJockey
    ? 'bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700'
    : 'bg-gradient-to-r from-pokemon-red via-rose-500 to-pokemon-yellow';

  const totalCount = isJockey
    ? JOCKEY_TOTAL_PRODUCTS
    : controllers.engine.state.search.response.totalCountFiltered;
  const itemNoun = isJockey ? 'products' : 'Pokemon';

  return (
    <div className="min-h-screen">
      <header className={`${headerGradient} shadow-md transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <Link
              to="/"
              className={`text-white tracking-wider drop-shadow text-lg sm:text-xl ${
                isJockey ? 'font-extrabold' : 'font-display'
              }`}
            >
              {headerTitle}
            </Link>
            <ModeToggle />
          </div>
          <SearchBox
            controller={controllers.searchBox}
            placeholder={
              isJockey
                ? 'Search products by name, fabrication, collection...'
                : 'Search Pokemon by name, type, ability...'
            }
          />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        <aside className="space-y-4">
          {isJockey ? (
            <>
              <StaticFacet title="Fabrication" values={JOCKEY_FABRICATIONS} />
              <StaticFacet title="Collection" values={JOCKEY_COLLECTIONS} />
            </>
          ) : (
            <>
              <Facet controller={controllers.typeFacet} title="Type" />
              <Facet controller={controllers.generationFacet} title="Generation" />
            </>
          )}
        </aside>

        <section>
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-800">
              {isJockey || resultListState.firstSearchExecuted
                ? `${totalCount.toLocaleString()} ${itemNoun}`
                : 'Loading...'}
            </h2>
          </div>

          {isJockey ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {JOCKEY_PRODUCTS.map((p) => (
                <JockeyCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <ResultList
              resultList={controllers.resultList}
              pager={controllers.pager}
            />
          )}
        </section>
      </main>
    </div>
  );
}
