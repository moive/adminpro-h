import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { User } from '../models/user.model';

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  constructor(private http: HttpClient) {}

  private transformUsers(result: any[]): User[] {
    return result.map(
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
  }

  search(type: 'users' | 'doctors' | 'hospitals', q: string) {
    const url = `${base_url}/full-search/collection/${type}/${q}`;
    return this.http.get(url, this.headers).pipe(
      map((resp: any) => {
        switch (type) {
          case 'users':
            return this.transformUsers(resp.results);

          default:
            return [];
        }
      }),
    );
  }

  removeUser(user: User) {
    const url = `${base_url}/users/${user.uid}`;

    return this.http.delete(url, this.headers);
  }
}
