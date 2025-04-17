import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.models';
import { authFeatureKey } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const selectUser = createSelector(
  selectAuthState,
  (state) => state.user
);
export const selectToken = createSelector(selectAuthState, (state) => {
  console.log('selectToken', state);

  return state?.jwt ?? null;
});
export const selectLoading = createSelector(
  selectAuthState,
  (state) => state.loading
);
export const selectError = createSelector(
  selectAuthState,
  (state) => state.error
);
export const isAuthenticated = createSelector(selectToken, (token): boolean => {
  console.log('isAuthenticated', token);

  return !!token;
});