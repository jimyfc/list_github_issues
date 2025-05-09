import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IssuesState } from './issues.models';

export const selectIssuesState = createFeatureSelector<IssuesState>('issues');

export const selectPage = createSelector(
  selectIssuesState,
  (state) => state.page
);

export const selectHasNextPage = createSelector(
  selectIssuesState,
  (state) => state.hasNextPage
);

export const selectAllIssues = createSelector(
  selectIssuesState,
  (state) => state.issues
);

export const selectIssuesLoading = createSelector(
  selectIssuesState,
  (state) => state.loading
);

export const selectIssuesError = createSelector(
  selectIssuesState,
  (state) => state.error
);
