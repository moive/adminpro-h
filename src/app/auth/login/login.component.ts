import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService, LocalStorageService, UserService } from '../../services';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('googleBtn') googleBtn!: ElementRef;

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
  ngAfterViewInit(): void {
    if (typeof google !== 'undefined') {
      this.googleInit();
    } else {
      window.addEventListener('load', () => {
        this.googleInit();
      });
    }
  }
  private googleInit() {
    google.accounts.id.initialize({
      client_id:
        '813156350905-ku0b4n8ph4mll8md55m897je0qkekne3.apps.googleusercontent.com',
      callback: (response: any) => this.handleCredentialResponse(response),
      auto_select: false,
      cancel_on_tap_outside: true,
      context: 'signin',
      ux_mode: 'popup', // this fix CORS
      itp_support: true,
    });
    google.accounts.id.renderButton(
      // document.getElementById('buttonDiv'),
      this.googleBtn.nativeElement,
      {
        theme: 'outline',
        size: 'large',
      },
    );
  }

  handleCredentialResponse(response: any) {
    // console.log('Encoded JWT ID token: ' + response.credential);
    this.userService.loginGoogle(response.credential).subscribe({
      next: () => this.handleLoginSuccess(),
      error: (err) => this.handleLogingError(err),
    });
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
