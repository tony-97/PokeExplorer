import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import FavoriteIcon from './FavoriteIcon';

interface PokemonType {
  type: { name: string };
}

interface Pokemon {
  name: string;
  sprites?: { front_default?: string };
  types?: PokemonType[];
}

export default function PokemonListItem({
  pokemon,
  onPress,
  onToggleFavorite,
  isFavorite,
}: {
  pokemon: Pokemon;
  onPress: () => void;
  onToggleFavorite?: () => void;
  isFavorite?: boolean;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ flexDirection: 'row', alignItems: 'center', padding: 8 }}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: pokemon.sprites?.front_default }}
        style={{ width: 60, height: 60, marginRight: 12 }}
      />
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 18, textTransform: 'capitalize' }}>
          {pokemon.name}
        </Text>
        <Text style={{ color: '#555' }}>
          {pokemon.types?.map(t => t.type.name).join(', ')}
        </Text>
      </View>
      {onToggleFavorite && (
        <FavoriteIcon
          isFavorite={!!isFavorite}
          onPress={onToggleFavorite}
          style={{ marginLeft: 8 }}
        />
      )}
    </TouchableOpacity>
  );
}
