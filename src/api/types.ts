export interface PokemonType {
  type: { name: string };
}

export interface PokemonData {
  name: string;
  sprites?: {
    front_default?: string;
    other?: { 'official-artwork': { front_default: string } };
  };
  types?: PokemonType[];
  stats?: { stat: { name: string; url: string }; base_stat: number }[];
  abilities?: { ability: { name: string; url: string } }[];
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
