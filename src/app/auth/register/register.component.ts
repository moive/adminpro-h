import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public registerForm;
  public formSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private alertService: AlertService,
    private router: Router,
  ) {
    this.registerForm = this.fb.nonNullable.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['test100@test.com', [Validators.required, Validators.email]],
        password: ['123456', [Validators.required, Validators.minLength(6)]],
        confirmPassword: [
          '123456',
          [Validators.required, Validators.minLength(6)],
        ],
        terms: [false, [Validators.required]],
      },
      { validators: this.passwordsEqual('password', 'confirmPassword') },
    );
  }

  createUser() {
    this.formSubmitted = true;
    // console.log(this.registerForm.value);
    console.log(this.registerForm);
    if (this.registerForm.invalid) return;

    this.userService.createUser(this.registerForm.getRawValue()).subscribe({
      next: (res) => {
        console.log('User created');
        console.log(res);
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        console.warn(err);
        this.alertService.error('Error', err.error.msg);
      },
    });
  }

  fieldValid(field: string): boolean {
    if (this.registerForm.get(field)?.invalid && this.formSubmitted)
      return true;
    else return false;
  }
  acceptTerms() {
    return !this.registerForm.get('terms')?.value && this.formSubmitted;
  }
  passwordsValid() {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('confirmPassword')?.value;

    if (pass1 !== pass2 && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }
  passwordsEqual(pass1Name: string, pass2Name: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!(control instanceof FormGroup)) {
        return null;
      }

      const pass1Control = control.get(pass1Name);
      const pass2Control = control.get(pass2Name);

      if (!pass1Control || !pass2Control) {
        return null;
      }

      if (pass1Control.value === pass2Control.value) {
        // 🔥 No borrar otros errores
        if (pass2Control.hasError('notEqual')) {
          const errors = { ...pass2Control.errors };
          delete errors['notEqual'];
          pass2Control.setErrors(Object.keys(errors).length ? errors : null);
        }
        return null;
      }

      pass2Control.setErrors({
        ...pass2Control.errors,
        notEqual: true,
      });

      return { noEsIgual: true };
    };
  }
  // passwordsEqual(pass1Name: string, pass2Name: string) {
  //   return (formGroup: FormGroup) => {
  //     const pass1Control = formGroup.get(pass1Name);
  //     const pass2Control = formGroup.get(pass2Name);

  //     if (pass1Control?.value === pass2Control?.value) {
  //       pass2Control?.setErrors(null);
  //       return null;
  //     } else {
  //       pass2Control?.setErrors({ notEqual: true });
  //       return { noEsIgual: true };
  //     }
  //   };
  // }
}
