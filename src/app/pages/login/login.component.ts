import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService)
  private router = inject(Router);

  error = signal('');
  cargando = signal(false);

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  iniciarSesion(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched;
      return;
    }

    this.cargando.set(true);
    this.error.set('');

    this.authService.login(this.form.getRawValue()).subscribe({
      next: () => {
        this.router.navigate(['/productos']);
      },
      error: (err) => {
        this.error.set('Usuario o contraseña incorrectos');
        this.cargando.set(false);
      }
    });
}

}