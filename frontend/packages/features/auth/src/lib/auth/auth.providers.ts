import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { authFeatureKey, reducer } from '../+state/auth.reducer';
import { AuthEffects } from '../+state/auth.effects';

export const provideAuthFeature = () => [
  provideState(authFeatureKey, reducer),
  provideEffects(AuthEffects),
]