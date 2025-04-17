import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private tokenKey = 'authToken';

  login(identifier: string, password: string) {
    return this.http.post<{ jwt: string, user: string }>('http://localhost:1337/api/auth/local', {
      identifier,
      password,
    }).pipe(
      tap((response) => {
        localStorage.setItem(this.tokenKey, response.jwt);
      }
    ));
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }
  
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

}