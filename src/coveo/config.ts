const orgId = import.meta.env.VITE_COVEO_ORGANIZATION_ID;
const accessToken = import.meta.env.VITE_COVEO_ACCESS_TOKEN;

if (!orgId || !accessToken) {
  console.error(
    'Missing Coveo credentials. Copy .env.example to .env.local and set ' +
      'VITE_COVEO_ORGANIZATION_ID and VITE_COVEO_ACCESS_TOKEN.',
  );
}

export const COVEO_CONFIG = {
  organizationId: orgId ?? '',
  accessToken: accessToken ?? '',
} as const;

export const POKEMON_FIELDS = [
  'pokedexnumber',
  'pokemontype',
  'pokemongeneration',
  'pokemonimage',
  'pokemonspecies',
  'pokemonheight',
  'pokemonweight',
  'pokemonabilities',
  'pokemonhp',
  'pokemonattack',
  'pokemondefense',
  'pokemonspatk',
  'pokemonspdef',
  'pokemonspeed',
] as const;
