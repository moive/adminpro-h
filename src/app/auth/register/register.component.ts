import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public registerForm;
  public formSubmitted = false;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group(
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
      { validators: this.passwordsEqual('password', 'confirmPassword') }
    );
  }

  createUser() {
    this.formSubmitted = true;
    // console.log(this.registerForm.value);
    console.log(this.registerForm);
    if (this.registerForm.valid) {
      console.log('Posted form');
    } else {
      console.log('Invalid form');
    }
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
  passwordsEqual(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null);
        return null;
      } else {
        pass2Control?.setErrors({ notEqual: true });
        return { noEsIgual: true };
      }
    };
  }
}
