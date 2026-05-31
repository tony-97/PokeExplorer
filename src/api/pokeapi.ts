import axios from 'axios';

import { Pokemon } from '../types/pokemon';

export const fetchPokemonList = async (
  offset: number = 0,
  limit: number = 50,
): Promise<{
  results: Pokemon[];
  next: string | null;
}> => {
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`,
  );
  return {
    results: response.data.results,
    next: response.data.next,
  };
};
