export interface AuthState {
  jwt: string | null;
  user: any | null;
  loading: boolean;
  error: string | null;
}
