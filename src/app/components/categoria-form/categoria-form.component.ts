import { Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Categoria, CategoriaRequest } from '../../core/models/categoria';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-categoria-form',
  styleUrl: './categoria-form.component.css',
  templateUrl: './categoria-form.component.html',
})
export class CategoriaFormComponent {
  private fb = inject(FormBuilder);

  categoria = input<Categoria | null>(null);
  guardar = output<CategoriaRequest>();
  cancelar = output<void>();

  form = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
    descripcion: ['']
  });

  constructor() {
    effect(() => {
      const c = this.categoria();
      if (c) {
        this.form.patchValue({
          nombre: c.nombre,
          descripcion: c.descripcion ?? ''});
      } else {
        this.form.reset();
      }
    });
  }

  enviar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.guardar.emit(this.form.getRawValue());
  }
}