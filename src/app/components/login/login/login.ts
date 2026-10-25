import { Component, inject, signal } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth-service';
import { roleEnum } from '../../../types/role';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private auth = inject(AuthService);

  error = signal('');
  passwordVisible = signal(false);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.getRawValue();

    this.auth.login(email!, password!).subscribe({
      next: () => {
        const role = this.auth.role();
        if (role === roleEnum.DIRECTOR) {
          this.router.navigate(['/cadastrar-familia']);
        } else if (role === roleEnum.TEACHER) {
          this.router.navigate(['/adicionar-anotacoes']);
        } else if (role === roleEnum.RESPONSIBLE) {
          this.router.navigate(['/responsavel/adicionar-anotacoes']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        console.error(err);
        this.error.set('Email ou senha inválidos');
      },
    });
  }
}
