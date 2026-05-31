import React from 'react';

import { Button, StyleSheet, Text, View } from 'react-native';

import { Pokemon } from '../types/pokemon';

export default function PokemonItem({
  pokemon,
  isFavorite,
  onAdd,
  onRemove,
}: {
  pokemon: Pokemon;
  isFavorite: boolean;
  onAdd: () => void;
  onRemove: () => void;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{pokemon.name}</Text>
      {isFavorite ? (
        <Button title="Remove" onPress={onRemove} />
      ) : (
        <Button title="Add" onPress={onAdd} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },

  text: { fontSize: 16 },
});
