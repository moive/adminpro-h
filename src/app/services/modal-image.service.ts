import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class ModalImageService {
  private _hiddenModal: boolean = true;

  type!: 'users' | 'doctors' | 'hospitals';
  id!: string;
  img!: string;

  public newImage: EventEmitter<string> = new EventEmitter<string>();

  get hiddenModal(): boolean {
    return this._hiddenModal;
  }

  constructor() {}

  openModal(
    type: 'users' | 'doctors' | 'hospitals',
    id: string,
    img: string = 'no-image',
  ) {
    this.type = type;
    this.id = id;
    this.img = img;

    this._hiddenModal = false;

    if (img.includes('https')) {
      this.img = img;
    } else {
      this.img = `${base_url}/upload/${type}/${img}`;
    }
  }

  closeModal() {
    this._hiddenModal = true;
  }
}
