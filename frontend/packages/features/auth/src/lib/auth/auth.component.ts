import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { LayoutComponent, InputComponent } from '@github-issues/shared';
import { AuthService } from '../services/auth.service';
import * as AuthActions from '../+state/auth.actions';

@Component({
  selector: 'lib-auth',
  imports: [CommonModule, FormsModule, LayoutComponent, InputComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  private router = inject(Router);
  private store = inject(Store);
  private authService = inject(AuthService);

  username: string = '';
  password: string = '';
  loading: boolean = false;
  error: string = '';

  onSubmit() {
    this.loading = true;
    this.store.dispatch(
      AuthActions.login({ identifier: this.username, password: this.password })
    );
  }
}
