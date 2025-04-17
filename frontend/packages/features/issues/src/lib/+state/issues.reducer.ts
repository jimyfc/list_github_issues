import { createReducer, on } from '@ngrx/store';

import {
  loadIssues,
  loadIssuesSuccess,
  loadIssuesFailure,
} from './issues.actions';
import { IssuesState } from './issues.models';

export const initialState: IssuesState = {
  issues: [],
  page: 1,
  hasNextPage: false,
  loading: false,
  error: null,
};

export const issuesReducer = createReducer(
  initialState,
  on(loadIssues, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadIssuesSuccess, (state, { issues, page, hasNextPage }) => ({
    ...state,
    loading: false,
    issues,
    page: page ?? 1,
    hasNextPage,
  })),
  on(loadIssuesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
