import { createAction, props } from '@ngrx/store';

export const loadIssues = createAction(
  '[Issues] Load Issues',
  props<{ repoUrl: string; page?: number }>()
);
export const loadIssuesSuccess = createAction(
  '[Issues] Load Issues Success',
  props<{ issues: any[]; page: number; hasNextPage: boolean }>()
);
export const loadIssuesFailure = createAction(
  '[Issues] Load Issues Failure',
  props<{ error: string }>()
);
