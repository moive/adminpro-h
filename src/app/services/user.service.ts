import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';

const baseUrl = environment.baseUrl;
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  createUser(formData: IRegisterForm) {
    return this.http.post(`${baseUrl}/users`, formData);
  }
}
