import {
  ADD_FAVORITE,
  AppActions,
  AppState,
  LOGIN,
  LOGIN_ERROR,
  LOGOUT,
  REMOVE_FAVORITE,
} from './types';

const initialState: AppState = {
  favorites: [],
  isLoggedIn: false,
  user: null,
  loginError: null,
};

export function appReducer(state = initialState, action: AppActions): AppState {
  switch (action.type) {
    case ADD_FAVORITE:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter(p => p.name !== action.payload),
      };
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
        loginError: null,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        loginError: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        loginError: null,
      };
    default:
      return state;
  }
}
