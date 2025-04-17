import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';

import * as AuthActions from './auth.actions';
import { AuthService } from '../services/auth.service';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ identifier, password }) =>
        this.authService.login(identifier, password).pipe(
          map((response) =>
            AuthActions.loginSuccess({
              jwt: response.jwt,
              user: response.user,
            })
          ),
          catchError((error) => {
            console.error('Login failed', error);
            return of(AuthActions.loginFailure({ error: error.message }));
          })
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        map(() => {
          this.router.navigate(['/issues']);
        })
      ),
    { dispatch: false }
  );

  initializeAuth$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.initializeAuth),
        map(() => {
          const token = this.authService.getToken();
          if (token) {
            return AuthActions.initializeAuthSuccess({ jwt: token });
          }
          return AuthActions.loginFailure({ error: 'No token' });
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        map(() => {
          this.authService.logout();
          this.router.navigate(['/auth']);
        })
      ),
    { dispatch: false }
  );
}
