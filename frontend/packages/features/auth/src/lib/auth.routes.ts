import { Routes } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { authGuard } from './guards/auth.guard';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: AuthComponent,
  },
];