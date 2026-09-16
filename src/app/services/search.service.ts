import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Hospital } from '../models/hospital.model';

const base_url = environment.baseUrl;

interface SearchResponse<T> {
  results: T[];
}

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
  private transformHospitals(result: any[]): Hospital[] {
    return result;
  }

  search<T>(
    type: 'users' | 'doctors' | 'hospitals',
    q: string,
  ): Observable<T[]> {
    const url = `${base_url}/full-search/collection/${type}/${q}`;
    return this.http.get<SearchResponse<any>>(url, this.headers).pipe(
      map((resp: any) => {
        switch (type) {
          case 'users':
            return this.transformUsers(resp.results) as T[];

          case 'hospitals':
            return this.transformHospitals(resp.results) as T[];

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

  updateUser(user: User) {
    return this.http.put(`${base_url}/users/${user.uid}`, user, this.headers);
  }
}
