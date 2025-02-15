import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { FirstKeyPipe } from '../../shared/pipes/first-key.pipe';
import { AuthService } from '../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, CommonModule, FirstKeyPipe, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  private formBuilder = inject(FormBuilder);
  private service = inject(AuthService);
  private toster = inject(ToastrService);
  private router = inject(Router)
  // constructor(private service: AuthService) {}

  isSubmitted: boolean = false;

  passworMatchValidator: ValidatorFn = (control: AbstractControl): null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (
      password &&
      confirmPassword &&
      password.value != confirmPassword.value
    ) {
      confirmPassword?.setErrors({ passwordMisMatch: true });
    } else confirmPassword?.setErrors(null);

    return null;
  };
  form = this.formBuilder.group(
    {
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/(?=.*[^a-zA-Z0-9])/),
        ],
      ],
      confirmPassword: [''],
    },
    { validators: this.passworMatchValidator }
  );
  onSubmit() {
    this.isSubmitted = true;
    if (this.form.valid) {
      this.service.createUser(this.form.value).subscribe({
        next: (res: any) => {
          if (res.success) {
            this.form.reset();
            this.isSubmitted = false;
            this.toster.success(
              'Account created successfully',
              'Registration Succeeded'
            );
            this.router.navigateByUrl('/signin')

          } else {
          }
        },
        error: (err) => {
          if (err.error.errors) {
            err.error.errors.forEach((x: any) => {
              switch (x.code) {
                case 'DuplicateEmail':
                  this.toster.error(
                    'Email already taken',
                    'Registration Faild!'
                  );
                  break;
                case 'DuplicateUserName':
                  this.toster.error(
                    'User name already taken',
                    'Registration Faild!'
                  );
                  break;
                default:
                  this.toster.error(
                    'Sorry! Please contact us.',
                    'Registration Faild!'
                  );
                  console.log(err);
                  break;
              }
            });
          } else {
            console.log('error', err);
          }
        },
      });
    }
  }

  hasDisplayableError(controlName: string): Boolean {
    const control = this.form.get(controlName);
    return (
      Boolean(control?.invalid) &&
      (this.isSubmitted || Boolean(control?.touched))
    );
  }
}
