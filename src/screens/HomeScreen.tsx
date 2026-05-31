import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { fetchPokemonList } from '../api/pokeapi';
import PokemonListItem from '../components/PokemonListItem';
import { RootStackParamList } from '../navigation/AppNavigator';
import { addFavorite, removeFavorite } from '../store/appSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { RootState } from '../store/store';

const PAGE_SIZE = 20;

export default function HomeScreen({
  navigation,
}: {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
}) {
  const [pokemon, setPokemon] = useState<any[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const favorites = useAppSelector((state: RootState) => state.favorites);
  const dispatch = useAppDispatch();

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const data = await fetchPokemonList(offset, PAGE_SIZE);
    const detailed = await Promise.all(
      data.results.map(async (p: any) => {
        const res = await fetch(p.url);
        return await res.json();
      }),
    );
    setPokemon(prev => [...prev, ...detailed]);
    setOffset(prev => prev + PAGE_SIZE);
    setHasMore(!!data.next);
    setLoading(false);
  }, [offset, loading, hasMore]);

  useEffect(() => {
    loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialDesignIcons
          name="pokemon-go"
          size={32}
          color="#1976D2"
          style={{ marginRight: 8 }}
        />
        <Text style={styles.title}>Pokédex</Text>
      </View>
      <FlatList
        data={pokemon}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <PokemonListItem
            pokemon={item}
            onPress={() => navigation.navigate('Detail', { pokemon: item })}
            onToggleFavorite={() => {
              if (favorites.some(f => f.name === item.name)) {
                dispatch(removeFavorite(item.name));
              } else {
                dispatch(addFavorite(item));
              }
            }}
            isFavorite={favorites.some(f => f.name === item.name)}
          />
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" color="#1976D2" /> : null
        }
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    elevation: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1976D2',
    letterSpacing: 1,
  },
  list: {
    padding: 8,
  },
});
