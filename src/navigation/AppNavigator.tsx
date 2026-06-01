import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { PokemonData } from '../api/types';
import DetailScreen from '../screens/DetailScreen';
import LoginScreen from '../screens/LoginScreen';
import { RootState } from '../store/store';
import MainTabs from './MainTabs';

export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  Favorites: undefined;
  Detail: { pokemon: PokemonData };
};

const Stack = createStackNavigator<RootStackParamList>();

export function AppNavigator() {
  const isLoggedIn = useSelector((state: RootState) => state.isLoggedIn);
  return (
    <Stack.Navigator>
      {!isLoggedIn ? (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      ) : (
        <>
          <Stack.Screen
            name="Main"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Detail" component={DetailScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
