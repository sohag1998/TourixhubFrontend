import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  private formBuilder = inject(FormBuilder);
  private service = inject(AuthService);
  private toster = inject(ToastrService);
  private router = inject(Router);
  isSubmitted: boolean = false;

  form = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit() {
    this.isSubmitted = true;

    if (this.form.valid) {
      this.service.signin(this.form.value).subscribe({
        next: (res: any) => {
          localStorage.setItem('token', res.token);
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          if (err.status == 400) {
            this.toster.error('Incorrect email or password', 'Signin Falid');
          } else {
            console.log('error during login\n', JSON.stringify(err));
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
