import { Pokemon } from '../types/pokemon';

import {
  ADD_FAVORITE,
  AppActions,
  LOGIN,
  LOGIN_ERROR,
  LOGOUT,
  REMOVE_FAVORITE,
} from './types';

export function addFavorite(pokemon: Pokemon): AppActions {
  return {
    type: ADD_FAVORITE,
    payload: pokemon,
  };
}

export function removeFavorite(name: string): AppActions {
  return {
    type: REMOVE_FAVORITE,
    payload: name,
  };
}

export function login(username: string, password: string): AppActions {
  if (username === 'admin' && password === '1234') {
    return {
      type: LOGIN,
      payload: username,
    };
  } else {
    return {
      type: LOGIN_ERROR,
      payload: 'Usuario o contraseña incorrectos',
    };
  }
}

export function logout(): AppActions {
  return {
    type: LOGOUT,
  };
}
