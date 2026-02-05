import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import type { ILoginForm, IRegisterForm } from '../interfaces';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs';

const baseUrl = environment.baseUrl;
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

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
}
