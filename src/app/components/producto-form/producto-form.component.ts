import { Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Producto, ProductoRequest } from '../../core/models/producto';
import { Categoria } from '../../core/models/categoria';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-producto-form',
  styleUrl: './producto-form.component.css',
  templateUrl: './producto-form.component.html',
})
export class ProductoFormComponent {

  private fb = inject(FormBuilder);

  producto = input<Producto | null>(null);
  categorias = input<Categoria[]>([]);
  guardar = output<ProductoRequest>();
  cancelar = output<void>();

  form = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
    precio: [0, [Validators.required, Validators.min(0.01)]],
    cantidad: [0, [Validators.required, Validators.min(0)]],
    categoriaId: [0, [Validators.required, Validators.min(1)]]
  });

  constructor() {
    effect(() => {
      const p = this.producto();
      if (p) {
        this.form.patchValue({
          nombre: p.nombre,
          descripcion: p.descripcion,
          precio: p.precio,
          cantidad: p.cantidad,
          categoriaId: p.categoria.id
        });
      } else {
        this.form.reset();
      }
    });
  }

  enviar() : void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.guardar.emit(this.form.getRawValue());
  }
}
