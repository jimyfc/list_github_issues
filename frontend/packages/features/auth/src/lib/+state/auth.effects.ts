import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, delay, map, mergeMap } from 'rxjs/operators';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ username }) =>
        of(username).pipe( // Simula petición
          delay(1000),
          map(() => AuthActions.loginSuccess({ user: username })),
          catchError(() => of(AuthActions.loginFailure({ error: 'Login failed' })))
        )
      )
    )
  );

  constructor(private actions$: Actions) {}
}
