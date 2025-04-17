import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';

import * as AuthActions from '@github-issues/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private store = inject(Store);
  title = 'GitHub Issues Tracker';

  ngOnInit() {
    this.store.dispatch(AuthActions.initializeAuth());
  }
}
