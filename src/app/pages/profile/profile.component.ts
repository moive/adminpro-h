import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  public profileForm!: FormGroup;
  user!: User;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
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
}
