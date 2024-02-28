import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  api = environment.apiUrl;
  authToken = new BehaviorSubject<string>(
    localStorage.getItem('auth_token') || ''
  );
  authUser = new BehaviorSubject<any>(
    JSON.parse(localStorage.getItem('user_login') || '{}')
  );

  constructor(private http: HttpClient, private router: Router) {}

  login(data: any) {
    return this.http.post<any>(`${this.api}/auth/login`, data);
  }

  registrasi(data: any) {
    return this.http.post<any>(`${this.api}/master/register`, data);
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_login');
    this.authToken.next('');
    this.authUser.next({});
    this.router.navigate(['/auth/login']);
  }

  savetoken(token: any, userLogin: any) {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user_login', JSON.stringify(userLogin));
    this.authToken.next(token);
    this.authUser.next(userLogin);
  }
  // FUNGSI GET
  getToken() {
    return localStorage.getItem('auth_token');
  }
  getUserLogin() {
    return JSON.parse(localStorage.getItem('user_login') || '{}');
  }

  // FUNGSI LOGOUT OTOMATIS
  calculateTokenExpiration(): number {
    const token = this.authToken.value;
    if (!token) {
      return 0;
    }

    const tokenData = JSON.parse(atob(token.split('.')[1]));
    const expiration = tokenData.exp * 1000;

    return expiration - Date.now();
  }

  logoutIfTokenExpired() {
    const expiration = this.calculateTokenExpiration();

    if (expiration <= 0) {
      this.logout();
    }
  }

  isLoggedIn(): Observable<boolean> {
    return this.authToken.pipe(
      map((token: string) => {
        const isLoggedIn = !!token;
        if (isLoggedIn) {
          this.logoutIfTokenExpired();
        }
        return isLoggedIn;
      })
    );
  }
}
