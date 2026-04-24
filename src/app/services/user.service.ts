import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, map, Observable, of, tap } from 'rxjs';

import type { ILoginForm, IRegisterForm, LoadUser } from '../interfaces';
import { environment } from '../../environments/environment';
import { LocalStorageService } from './local-storage.service';
import { User } from '../models/user.model';

const baseUrl = environment.baseUrl;
const TOKEN_KEY = 'token';

interface ProfileData {
  name: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user!: User;

  constructor(
    private http: HttpClient,
    private localStorageSevice: LocalStorageService,
  ) {}

  get token() {
    return this.localStorageSevice.get(TOKEN_KEY) ?? '';
  }

  get uid(): string {
    return this.user?.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  validateToken(): Observable<boolean> {
    return this.http.get(`${baseUrl}/login/renew`, this.headers).pipe(
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

  udatedProfile(data: ProfileData) {
    data = {
      ...data,
      role: this.user?.role!,
    };
    return this.http.put(`${baseUrl}/users/${this.uid}`, data, this.headers);
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

  loadUsers(from: number = 0) {
    const url = `${baseUrl}/users?from=${from}`;
    return this.http.get<LoadUser>(url, this.headers).pipe(
      map((resp) => {
        const users = resp.users.map(
          (user) =>
            new User(
              user.name,
              user.email,
              '',
              user.img,
              user.google,
              user.role,
              user.uid,
            ),
        );
        return {
          total: resp.total,
          users,
        };
      }),
    );
  }
}
