export interface PokemonType {
  type: { name: string };
}

export interface PokemonData {
  name: string;
  sprites?: { front_default?: string };
  types?: PokemonType[];
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}
