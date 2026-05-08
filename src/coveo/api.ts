import { getOrganizationEndpoints } from '@coveo/headless';
import { COVEO_CONFIG, POKEMON_FIELDS } from './config';

export interface PokemonResultRaw {
  pokedexnumber?: number | string;
  pokemontype?: string | string[];
  pokemongeneration?: string | number;
  pokemonimage?: string;
  pokemonspecies?: string;
  pokemonheight?: number | string;
  pokemonweight?: number | string;
  pokemonabilities?: string | string[];
  pokemonhp?: number;
  pokemonattack?: number;
  pokemondefense?: number;
  pokemonspatk?: number;
  pokemonspdef?: number;
  pokemonspeed?: number;
  [key: string]: unknown;
}

export interface PokemonResult {
  uniqueId: string;
  title: string;
  raw: PokemonResultRaw;
}

interface CoveoSearchResponse {
  results: PokemonResult[];
  totalCount: number;
}

export async function searchPokemonByPokedexNumber(
  pokedexNumber: string,
): Promise<PokemonResult | null> {
  const platform = getOrganizationEndpoints(COVEO_CONFIG.organizationId).platform;
  const url = `${platform}/rest/search/v2`;
  const body = {
    aq: `@pokedexnumber==${JSON.stringify(pokedexNumber)}`,
    numberOfResults: 1,
    fieldsToInclude: [...POKEMON_FIELDS],
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${COVEO_CONFIG.accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`Coveo search failed: ${res.status} ${res.statusText}`);
  }

  const data = (await res.json()) as CoveoSearchResponse;
  return data.results[0] ?? null;
}
