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

  loadHospitals() {
    const url = `${base_url}/hospitals`;
    return this.http
      .get<LoadHospital>(url, this.headers)
      .pipe(map((resp) => resp.hospitals));
  }
}
