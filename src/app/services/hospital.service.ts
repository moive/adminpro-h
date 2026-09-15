import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { environment } from '@/environments/environment';
import { LocalStorageService } from './local-storage.service';

import { Hospital } from '../models/hospital.model';
import { LoadHospital } from '../interfaces';

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
  ) {}

  get token(): string {
    return this.localStorageService.get('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  urlBase(id?: string) {
    if (id) return `${base_url}/hospitals/${id}`;
    return `${base_url}/hospitals`;
  }

  loadHospitals() {
    return this.http
      .get<LoadHospital>(this.urlBase(), this.headers)
      .pipe(map((resp) => resp.hospitals));
  }

  createHospital(name: string) {
    return this.http.post(this.urlBase(), { name }, this.headers);
  }
  updateHospital(_id: string, name: string) {
    return this.http.put(this.urlBase(_id), { name }, this.headers);
  }
  deleteHospital(_id: string) {
    return this.http.delete(this.urlBase(_id), this.headers);
  }
}
