import { Component, inject , signal } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService)
  private router = inject(Router);

  error = signal('');
  exito = signal('');
  cargando = signal(false);

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  registrar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched;
      return;
    }

    this.cargando.set(true);
    this.error.set('');

    this.authService.registrar(this.form.getRawValue()).subscribe({
      next: () => {
        this.exito.set('Cuenta creada. Ahora puedes iniciar sesión.');
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 409) {
          this.error.set('El usuario ya existe');
        } else {
          this.error.set('No se pudo registrar el usuario');
        }
        this.cargando.set(false);
      }
    });
  }
}