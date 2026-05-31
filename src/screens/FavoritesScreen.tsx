import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PokemonListItem from '../components/PokemonListItem';
import { RootStackParamList } from '../navigation/AppNavigator';
import { removeFavorite } from '../store/actions';
import { RootState } from '../store/store';

export default function FavoritesScreen({
  navigation,
}: {
  navigation: StackNavigationProp<RootStackParamList, 'Favorites'>;
}) {
  const favorites = useSelector((state: RootState) => state.favorites);
  const dispatch = useDispatch();

  return (
    <View>
      <FlatList
        data={favorites}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <PokemonListItem
            pokemon={item}
            onPress={() => navigation.navigate('Detail', { pokemon: item })}
            onToggleFavorite={() => dispatch(removeFavorite(item.name))}
            isFavorite={true}
          />
        )}
      />
    </View>
  );
}
