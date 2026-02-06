import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, map, Observable, of, tap } from 'rxjs';

import type { ILoginForm, IRegisterForm } from '../interfaces';
import { environment } from '../../environments/environment';

const baseUrl = environment.baseUrl;
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  validateToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    return this.http
      .get(`${baseUrl}/login/renew`, {
        headers: { 'x-token': token },
      })
      .pipe(
        tap((res: any) => {
          localStorage.setItem('token', res['token']);
        }),
        map(() => true),
        catchError((error) => of(false)),
      );
  }

  createUser(formData: IRegisterForm) {
    return this.http.post(`${baseUrl}/users`, formData).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res['token']);
      }),
    );
  }

  login(formData: ILoginForm) {
    return this.http.post(`${baseUrl}/login`, formData).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res['token']);
      }),
    );
  }

  loginGoogle(token: string) {
    return this.http.post(`${baseUrl}/login/google`, { token }).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res['token']);
      }),
    );
  }

  logout() {
    localStorage.removeItem('token');
  }
}
