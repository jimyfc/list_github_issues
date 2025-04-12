import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as IssuesActions from './issues.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Issue } from './issues.models';

@Injectable()
export class IssuesEffects {
  loadIssues$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IssuesActions.loadIssues),
      mergeMap(({ repoUrl }) => {
        const [owner, repo] = repoUrl.replace('https://github.com/', '').split('/');
        const apiUrl = `https://api.github.com/repos/${owner}/${repo}/issues`;

        return this.http.get<Issue[]>(apiUrl).pipe(
          map((issues) => IssuesActions.loadIssuesSuccess({ issues })),
          catchError((err) =>
            of(IssuesActions.loadIssuesFailure({ error: err.message }))
          )
        );
      })
    )
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
