import { createAction, props } from '@ngrx/store';

export const initializeAuth = createAction('[Auth] Inicializar autenticación');

export const initializeAuthSuccess = createAction(
  '[Auth] Inicializar autenticación exitosa',
  props<{ jwt: string }>()
);

export const login = createAction(
  '[Auth] Login',
  props<{ identifier: string; password: string }>()
);

export const logout = createAction('[Auth] Cerrar sesión');

export const loginSuccess = createAction(
  '[Auth] Autenticación exitosa',
  props<{ jwt: string; user: string }>()
);

export const loginFailure = createAction(
  '[Auth] Autenticación fallida',
  props<{ error: string }>()
);
