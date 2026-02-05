import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService, LocalStorageService, UserService } from '../../services';

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
    private alertService: AlertService,
    private localStorageService: LocalStorageService,
  ) {
    this.loginForm = this.createLoginForm();
  }
  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.userService.login(this.loginForm.getRawValue()).subscribe({
      next: () => this.handleLoginSuccess(),
      error: (err) => this.handleLogingError(err),
    });
  }

  private createLoginForm(): FormGroup {
    return this.fb.nonNullable.group({
      email: [
        localStorage.getItem('email') ?? '',
        [Validators.required, Validators.email],
      ],
      password: ['', Validators.required],
      remember: [localStorage.getItem('remember') === 'true' || false],
    });
  }

  private handleLoginSuccess(): void {
    this.handleRememberMe();
    this.router.navigateByUrl('/');
  }

  private handleLogingError(err: any): void {
    const errorMessage = err?.error?.msg || 'Error logging in';
    this.alertService.error('Error', errorMessage);
  }

  private handleRememberMe(): void {
    const remember = this.loginForm.get('remember')?.value;
    const email = this.loginForm.get('email')?.value;

    if (remember) {
      this.localStorageService.set('email', email ?? '');
      this.localStorageService.set('remember', 'true');
    } else {
      this.localStorageService.remove('email');
      this.localStorageService.remove('remember');
    }
  }
}
