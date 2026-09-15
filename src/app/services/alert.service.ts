import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';
@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  private showAlert(options: SweetAlertOptions): Promise<SweetAlertResult> {
    return Swal.fire(options);
  }

  success(title: string, text?: string): Promise<SweetAlertResult> {
    return this.showAlert({
      icon: 'success',
      title,
      text,
      confirmButtonColor: '#3085d6',
    });
  }

  error(title: string, text?: string): Promise<SweetAlertResult> {
    return this.showAlert({
      icon: 'error',
      title,
      text,
      confirmButtonColor: '#d33',
    });
  }

  confirm(title: string, text?: string): Promise<SweetAlertResult> {
    return this.showAlert({
      icon: 'warning',
      title,
      text,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    });
  }

  async confirmDelete(
    title: string = 'Are you sure?',
    text?: string,
  ): Promise<boolean> {
    const result = await this.showAlert({
      icon: 'warning',
      title,
      html: text || 'This action cannot be undone.',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    });

    return result.isConfirmed;
  }

  async inputText(
    title?: string,
    placelholder?: string,
    label?: string,
  ): Promise<string | undefined> {
    const result = await this.showAlert({
      title: title ?? 'Input Information',
      input: 'text',
      inputLabel: label ?? 'Your text',
      inputPlaceholder: placelholder ?? 'Enter your text',
      inputValidator: (value) => {
        if (!value.trim()) {
          return 'Hospital name is required';
        }
        return null;
      },
      confirmButtonText: 'Save',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
    });

    return result.value;
  }

  // Método público para casos personalizados
  custom(options: SweetAlertOptions): Promise<SweetAlertResult> {
    return this.showAlert(options);
  }
}
