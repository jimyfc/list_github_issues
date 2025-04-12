import { createReducer, on } from '@ngrx/store';
import * as IssuesActions from './issues.actions';
import { IssuesState } from './issues.models';

export const initialState: IssuesState = {
  issues: [],
  loading: false,
  error: null,
};

export const issuesReducer = createReducer(
  initialState,
  on(IssuesActions.loadIssues, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(IssuesActions.loadIssuesSuccess, (state, { issues }) => ({
    ...state,
    loading: false,
    issues,
  })),
  on(IssuesActions.loadIssuesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
