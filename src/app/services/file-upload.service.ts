import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor() {}

  async updatedPhoto(
    file: File,
    type: 'users' | 'doctors' | 'hospitals',
    id: string,
  ) {
    try {
      const url = `${base_url}/upload/${type}/${id}`;
      const formData = new FormData();
      formData.append('images', file);

      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || '',
        },
        body: formData,
      });

      const data = await resp.json();

      if (data.ok) return data.nameFile;
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
