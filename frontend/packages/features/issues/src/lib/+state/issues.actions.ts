import { createAction, props } from '@ngrx/store';
import { Issue } from './issues.models';

export const loadIssues = createAction(
  '[Issues] Load Issues',
  props<{ repoUrl: string }>()
);

export const loadIssuesSuccess = createAction(
  '[Issues] Load Issues Success',
  props<{ issues: Issue[] }>()
);

export const loadIssuesFailure = createAction(
  '[Issues] Load Issues Failure',
  props<{ error: string }>()
);
