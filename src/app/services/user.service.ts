import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, map, Observable, of, tap } from 'rxjs';

import type { ILoginForm, IRegisterForm } from '../interfaces';
import { environment } from '../../environments/environment';
import { LocalStorageService } from './local-storage.service';
import { User } from '../models/user.model';

const baseUrl = environment.baseUrl;
const TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: User | null = null;
  constructor(
    private http: HttpClient,
    private localStorageSevice: LocalStorageService,
  ) {}

  validateToken(): Observable<boolean> {
    const token = this.localStorageSevice.get(TOKEN_KEY) || '';
    return this.http
      .get(`${baseUrl}/login/renew`, {
        headers: { 'x-token': token },
      })
      .pipe(
        tap((res: any) => {
          const { name, email, img, google, role, uid } = res.user;
          this.user = new User(name, email, '', img, google, role, uid);

          this.localStorageSevice.set(TOKEN_KEY, res['token']);
        }),
        map(() => true),
        catchError((error) => of(false)),
      );
  }

  createUser(formData: IRegisterForm) {
    return this.http.post(`${baseUrl}/users`, formData).pipe(
      tap((res: any) => {
        this.localStorageSevice.set(TOKEN_KEY, res['token']);
      }),
    );
  }

  login(formData: ILoginForm) {
    return this.http.post(`${baseUrl}/login`, formData).pipe(
      tap((res: any) => {
        this.localStorageSevice.set(TOKEN_KEY, res['token']);
      }),
    );
  }

  loginGoogle(token: string) {
    return this.http.post(`${baseUrl}/login/google`, { token }).pipe(
      tap((res: any) => {
        this.localStorageSevice.set(TOKEN_KEY, res['token']);
      }),
    );
  }

  logout() {
    this.localStorageSevice.remove(TOKEN_KEY);
  }
}
