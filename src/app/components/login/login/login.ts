import {
  Component,
  inject,
  signal
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private auth = inject(AuthService);

  error = signal('');

  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  onSubmit(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { username, password } = this.form.getRawValue();

    /**
     * MOCK LOGIN
     */
    if (
      username === 'admin' &&
      password === '123456'
    ) {

      this.auth.login();

      this.router.navigate(['/cadastrar-familia']);

      return;
    }

    this.error.set('Credenciais inválidas');
  }

}