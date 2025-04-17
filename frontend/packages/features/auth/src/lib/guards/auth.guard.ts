import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { map, take, switchMap, catchError, of } from 'rxjs';

import { selectToken } from '../+state/auth.selectors';

export const authGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);
  const http = inject(HttpClient);

  return store.select(selectToken).pipe(
    take(1),
    switchMap((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigate(['/auth']);
        return of(false);
      }

      return http
        .get('http://localhost:1337/api/users/me', {
          headers: { Authorization: `Bearer ${isAuthenticated}` },
        })
        .pipe(
          map(() => true),
          catchError(() => {
            router.navigate(['/auth']);
            return of(false);
          })
        );
    })
  );
};
