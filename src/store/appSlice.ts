import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PokemonData } from '../api/types';

export interface AppState {
  favorites: PokemonData[];
  isLoggedIn: boolean;
  user: string | null;
  loginError?: string | null;
}

const initialState: AppState = {
  favorites: [],
  isLoggedIn: false,
  user: null,
  loginError: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<PokemonData>) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites.filter(p => p.name !== action.payload);
    },
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.loginError = null;
    },
    loginError: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = false;
      state.user = null;
      state.loginError = action.payload;
    },
    logout: state => {
      state.isLoggedIn = false;
      state.user = null;
      state.loginError = null;
    },
  },
});

export const { addFavorite, removeFavorite, loginSuccess, loginError, logout } =
  appSlice.actions;

export function login(username: string, password: string) {
  if (username === 'admin' && password === '1234') {
    return loginSuccess(username);
  } else {
    return loginError('Usuario o contraseña incorrectos');
  }
}

export default appSlice.reducer;
