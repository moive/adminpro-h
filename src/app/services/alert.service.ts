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
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    });
  }

  async confirmDelete(
    title: string = '¿Estás seguro?',
    text?: string,
  ): Promise<boolean> {
    const result = await this.showAlert({
      icon: 'warning',
      title,
      text: text || 'Esta acción no se puede deshacer',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    });

    return result.isConfirmed;
  }

  // Método público para casos personalizados
  custom(options: SweetAlertOptions): Promise<SweetAlertResult> {
    return this.showAlert(options);
  }
}
