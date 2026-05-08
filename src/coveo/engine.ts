import {
  buildSearchEngine,
  buildSearchBox,
  buildFacet,
  buildResultList,
  buildPager,
  buildResultsPerPage,
  buildSort,
  getOrganizationEndpoints,
  loadAdvancedSearchQueryActions,
  type SearchEngine,
  type SearchBox,
  type Facet,
  type ResultList,
  type Pager,
  type ResultsPerPage,
  type Sort,
} from '@coveo/headless';
import { COVEO_CONFIG, POKEMON_FIELDS } from './config';

export interface PokemonSearchControllers {
  engine: SearchEngine;
  searchBox: SearchBox;
  typeFacet: Facet;
  generationFacet: Facet;
  resultList: ResultList;
  pager: Pager;
  resultsPerPage: ResultsPerPage;
  sort: Sort;
}

let cached: PokemonSearchControllers | null = null;

export function getSearchControllers(): PokemonSearchControllers {
  if (cached) return cached;

  const engine = buildSearchEngine({
    configuration: {
      organizationId: COVEO_CONFIG.organizationId,
      accessToken: COVEO_CONFIG.accessToken,
      organizationEndpoints: getOrganizationEndpoints(COVEO_CONFIG.organizationId),
      search: {
        searchHub: 'PokemonSearch',
      },
    },
  });

  const { registerAdvancedSearchQueries } = loadAdvancedSearchQueryActions(engine);
  engine.dispatch(registerAdvancedSearchQueries({ cq: '@pokedexnumber' }));

  const searchBox = buildSearchBox(engine, {
    options: {
      numberOfSuggestions: 6,
    },
  });

  const typeFacet = buildFacet(engine, {
    options: {
      facetId: 'pokemontype',
      field: 'pokemontype',
      numberOfValues: 18,
    },
  });

  const generationFacet = buildFacet(engine, {
    options: {
      facetId: 'pokemongeneration',
      field: 'pokemongeneration',
      numberOfValues: 9,
    },
  });

  const resultList = buildResultList(engine, {
    options: {
      fieldsToInclude: [...POKEMON_FIELDS, 'permanentid'],
    },
  });

  const pager = buildPager(engine, { options: { numberOfPages: 5 } });
  const resultsPerPage = buildResultsPerPage(engine, {
    initialState: { numberOfResults: 24 },
  });
  const sort = buildSort(engine);

  cached = {
    engine,
    searchBox,
    typeFacet,
    generationFacet,
    resultList,
    pager,
    resultsPerPage,
    sort,
  };
  return cached;
}
