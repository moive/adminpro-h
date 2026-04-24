import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploadService, UserService } from '../../services';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  public profileForm!: FormGroup;
  public user!: User;
  public selectedFile!: File;
  public imgTemp: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private fileUploadService: FileUploadService,
  ) {
    this.user = this.userService.user;
  }

  ngOnInit(): void {
    this.intializateForm();
  }

  intializateForm(): void {
    this.profileForm = this.fb.group({
      name: [this.user?.name, [Validators.required]],
      email: [this.user?.email, [Validators.required, Validators.email]],
    });
  }

  updatedProfile(): void {
    console.log(this.profileForm.value);
    this.userService.udatedProfile(this.profileForm.value).subscribe(() => {
      const { name, email } = this.profileForm.value;
      this.user.name = name;
      this.user.email = email;
    });
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
    this.fileUploadService
      .updatedPhoto(this.selectedFile, 'users', this.user.uid!)
      .then((img) => (this.user.img = img));
  }
}
