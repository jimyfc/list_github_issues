import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { IssuesState } from 'packages/features/issues/src/lib/+state/issues.models';
import { issuesReducer } from 'packages/features/issues/src/lib/+state/issues.reducer';

export interface State {
  issues: IssuesState;
}

export const reducers: ActionReducerMap<State> = {
  issues: issuesReducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
