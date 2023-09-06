import { BehaviorSubject } from 'rxjs';
import { IUser } from '../interfaces/IUser';
import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<IUser | null>(null);
  constructor(private tokenService: TokenService) {
    if (this.tokenService.hasToken()) {
      this.decodeAndNotify();
    }
  }
  decodeAndNotify() {
    const token = this.tokenService.getToken();
    const user = jwt_decode(token) as IUser;
    this.userSubject.next(user);
  }

  getUser() {
    return this.userSubject.asObservable();
  }

  saveToken(token: string): void {
    this.tokenService.saveToken(token);
    this.decodeAndNotify();
  }

  logout(): void {
    this.tokenService.deleteToken();
    this.userSubject.next(null);
  }

  isLogged(): boolean {
    return this.tokenService.hasToken();
  }
}
