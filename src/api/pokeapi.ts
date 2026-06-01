import axios from 'axios';

import { PokemonData, PokemonListItem, PokemonListResponse } from './types';

export async function fetchPokemonList(
  offset: number = 0,
  limit: number = 50,
): Promise<PokemonListResponse> {
  const response = await axios.get<PokemonListResponse>(
    'https://pokeapi.co/api/v2/pokemon',
    {
      params: {
        offset,
        limit,
      },
    },
  );
  return response.data;
}

export async function fetchPokemon(pokemons: PokemonListItem[]) {
  return await Promise.all(
    pokemons.map(async pokemon => {
      const response = await axios.get<PokemonData>(pokemon.url);
      return response.data;
    }),
  );
}
