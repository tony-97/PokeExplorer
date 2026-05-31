import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FavoriteIcon from '../components/FavoriteIcon';
import { RootStackParamList } from '../navigation/AppNavigator';
import { addFavorite, removeFavorite } from '../store/actions';
import { RootState } from '../store/store';

export default function DetailScreen({
  route,
}: {
  navigation: StackNavigationProp<RootStackParamList, 'Detail'>;
  route: RouteProp<RootStackParamList, 'Detail'>;
}) {
  const { pokemon } = route.params;
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites);
  const isFavorite = favorites.some(f => f.name === pokemon.name);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(pokemon.name));
    } else {
      dispatch(addFavorite(pokemon));
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{
          uri: pokemon.sprites?.other['official-artwork'].front_default,
        }}
        style={styles.image}
      />
      <Text style={styles.name}>{pokemon.name}</Text>
      <FavoriteIcon
        isFavorite={isFavorite}
        onPress={handleToggleFavorite}
        size={32}
        style={{ marginBottom: 16, alignSelf: 'center' }}
      />
      <Text style={styles.types}>
        Tipos: {pokemon.types.map((t: any) => t.type.name).join(', ')}
      </Text>
      <Text style={styles.section}>Estadísticas:</Text>
      {pokemon.stats.map((stat: any) => (
        <Text key={stat.stat.name}>
          {stat.stat.name}: {stat.base_stat}
        </Text>
      ))}
      <Text style={styles.section}>Habilidades:</Text>
      {pokemon.abilities.map((a: any) => (
        <Text key={a.ability.name}>{a.ability.name}</Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  types: {
    fontSize: 18,
    marginBottom: 12,
  },
  section: {
    fontSize: 20,
    marginTop: 16,
    fontWeight: 'bold',
  },
});
