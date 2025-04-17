import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import {
  loadIssues,
  loadIssuesSuccess,
  loadIssuesFailure,
} from './issues.actions';
import { parseLinkHeader } from '../utils/pagination.util';

@Injectable({ providedIn: 'root' })
export class IssuesEffects {
  actions$: Actions = inject(Actions);
  http: HttpClient = inject(HttpClient);
  store: Store = inject(Store);

  loadIssues$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadIssues),
      tap(() => console.log('loadIssues effect triggered')),
      switchMap(({ repoUrl, page = 1 }) => {
        const [owner, repo] = repoUrl
          .replace('https://github.com/', '')
          .split('/');
        const apiUrl = `https://api.github.com/repos/${owner}/${repo}/issues?page=${page}&per_page=15`;

        return this.http.get<any[]>(apiUrl, { observe: 'response' }).pipe(
          map((response) => {
            const linkHeader = response.headers.get('Link') || '';
            const hasNextPage = parseLinkHeader(linkHeader);
            console.log('hasNextPage', hasNextPage);

            return loadIssuesSuccess({
              issues: response.body || [],
              page: page,
              hasNextPage: hasNextPage,
            });
          }),
          catchError((error) => of(loadIssuesFailure({ error: error.message })))
        );
      })
    )
  );
}
