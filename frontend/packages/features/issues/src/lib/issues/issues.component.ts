import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as IssuesActions from '../+state/issues.actions';
import * as IssuesSelectors from '../+state/issues.selectors';
import { Issue } from '../+state/issues.models';
import {
  LayoutComponent,
  InputComponent,
  PaginationComponent,
  IssueCardComponent,
} from '@github-issues/shared';
import * as AuthActions from '@github-issues/auth';

@Component({
  selector: 'lib-issues',
  templateUrl: './issues.component.html',
  styleUrl: './issues.component.css',
  imports: [
    CommonModule,
    FormsModule,
    LayoutComponent,
    InputComponent,
    PaginationComponent,
    IssueCardComponent,
  ],
  standalone: true,
})
export class IssuesComponent {
  store = inject(Store);

  repoUrl = '';

  issues$: Observable<Issue[]> = this.store.select(
    IssuesSelectors.selectAllIssues
  );

  page$: Observable<number> = this.store.select(IssuesSelectors.selectPage);

  hasNextPage$: Observable<boolean> = this.store.select(
    IssuesSelectors.selectHasNextPage
  );

  loading$: Observable<boolean> = this.store.select(
    IssuesSelectors.selectIssuesLoading
  );

  error$: Observable<string | null> = this.store.select(
    IssuesSelectors.selectIssuesError
  );

  loadIssues(page: number) {
    this.store.dispatch(
      IssuesActions.loadIssues({ repoUrl: this.repoUrl, page })
    );
  }

  onChangePage(page: number) {
    this.store.dispatch(
      IssuesActions.loadIssues({ repoUrl: this.repoUrl, page: page })
    );
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
