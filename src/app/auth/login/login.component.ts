import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public formSubmitted = false;

  public loginForm;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    public alertService: AlertService,
  ) {
    this.loginForm = this.fb.nonNullable.group({
      email: [
        localStorage.getItem('email') ?? '',
        [Validators.required, Validators.email],
      ],
      password: ['', Validators.required],
      remember: [localStorage.getItem('remember') === 'true' || false],
    });
  }
  login() {
    console.log(this.loginForm.value);
    if (this.loginForm.invalid) return;
    this.userService.login(this.loginForm.getRawValue()).subscribe({
      next: (res) => {
        if (this.loginForm.get('remember')?.value) {
          localStorage.setItem(
            'email',
            this.loginForm.get('email')?.value ?? '',
          );
          localStorage.setItem(
            'remember',
            String(this.loginForm.get('remember')?.value),
          );
        } else {
          localStorage.removeItem('email');
          localStorage.removeItem('remember');
        }
        console.log('Login successful');
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        console.warn(err);
        this.alertService.error('Error', err.error.msg);
      },
    });
  }
}
