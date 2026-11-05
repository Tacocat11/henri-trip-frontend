
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { API_URL } from '../api.config';
import { LoginRequest, LoginResponse } from '../models/auth.model';

import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private http = inject(HttpClient);

  private platformId = inject(PLATFORM_ID);

  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
 }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${API_URL}/auth/login`,
      credentials
    ).pipe(
      tap(response => {
        sessionStorage.setItem('token', response.token);
        sessionStorage.setItem('role', response.role);
        sessionStorage.setItem('email', response.email);
      })
    );
  }

  getToken(): string | null {
    if (!this.isBrowser) return null;

    return sessionStorage.getItem('token');
  }

  getRole(): 'USER' | 'ADMIN' | null {
    if (!this.isBrowser) return null;
    const role = sessionStorage.getItem('role');
    return role === 'USER' || role === 'ADMIN' ? role : null;
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('email');
  }
}
