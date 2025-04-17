import { createReducer, on } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import { AuthState } from './auth.models';

export const authFeatureKey = 'auth';

export const initialState: AuthState = {
  jwt: localStorage.getItem('authToken') || null,
  user: null,
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { jwt, user }) => ({
    ...state,
    jwt,
    user,
    loading: false,
    error: null,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(AuthActions.login, (state) => initialState)
);

export const reducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { jwt, user }) => ({
    ...state,
    jwt,
    user,
    loading: false,
    error: null,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(AuthActions.login, (state) => initialState)
);