import { Injectable } from '@angular/core';

const KEY = 'authToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  saveToken(token: string): void {
    return localStorage.setItem(KEY, token);
  }

  deleteToken(): void {
    return localStorage.removeItem(KEY);
  }
  getToken(): string {
    return localStorage.getItem(KEY) ?? '';
  }

  hasToken(): boolean {
    return !!this.getToken();
  }
}
