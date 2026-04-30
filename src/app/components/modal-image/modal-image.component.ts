import { Component } from '@angular/core';
import { FileUploadService, ModalImageService } from '../../services';
import { User } from '../../models/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styleUrl: './modal-image.component.scss',
})
export class ModalImageComponent {
  public user!: User;
  public selectedFile!: File;
  public imgTemp: string | null = null;
  constructor(
    public modalImageService: ModalImageService,
    private fileUploadService: FileUploadService,
  ) {}

  closeModal() {
    this.imgTemp = null;
    this.modalImageService.closeModal();
  }

  onChangeImage(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      this.imgTemp = null;
      return;
    }
    const file = input.files[0];
    this.selectedFile = file;

    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result as string;
    };
  }
  uploadImage() {
    const { id, type } = this.modalImageService;

    this.fileUploadService
      .updatedPhoto(this.selectedFile, type, id)
      .then((img) => {
        Swal.fire('Success', 'Image user updated', 'success');

        this.modalImageService.newImage.emit(img);

        this.closeModal();
      })
      .catch((err) => {
        console.log(err);
        // Swal.fire('Error', err.msg, 'error');
      });
  }
}
