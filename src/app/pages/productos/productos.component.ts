import { Component, OnInit, inject, signal } from '@angular/core';
import { CurrencyPipe} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductoService } from '../../core/services/producto.service';
import { CategoriaService } from '../../core/services/categoria.service';
import { AuthService } from '../../core/services/auth.service';
import {Producto, ProductoRequest} from '../../core/models/producto';
import { Categoria } from '../../core/models/categoria';
import { ProductoFormComponent } from '../../components/producto-form/producto-form.component';

@Component({
  imports: [ProductoFormComponent, CurrencyPipe],
  selector: 'app-productos',
  styleUrl: './productos.component.css',
  templateUrl: './productos.component.html',
})
export class ProductosComponent {

   private productoService = inject(ProductoService);
   private categoriaService = inject(CategoriaService);
   protected authService = inject(AuthService);

   productos = signal<Producto[]>([]);
   categorias = signal<Categoria[]>([]);
   mostrarFormulario = signal(false);
   productoEditando = signal<Producto | null>(null);
   error = signal('');
   mensaje = signal('');

   ngOnInit(): void {
    this.cargar();
    this.categoriaService.listar().subscribe({
      next: datos => this.categorias.set(datos)
    });
   }

   cargar(): void {
    this.productoService.listar().subscribe({
      next: datos => this.productos.set(datos),
      error: () => this.error.set('No se pudieron cargar los productos')
    });
   }

   nuevo(): void {
    this.productoEditando.set(null);
    this.mostrarFormulario.set(true);
    this.limpiarMensajes();
   }

   editar(producto: Producto): void {
    this.productoEditando.set(producto);
    this.mostrarFormulario.set(true);
    this.limpiarMensajes();
  }

  cerrarFormulario(): void {
    this.mostrarFormulario.set(false);
    this.productoEditando.set(null);
  }

  guardar(datos: ProductoRequest): void {
    const editando = this.productoEditando();

    const peticion = editando
    ? this.productoService.actualizar(editando.id, datos)
    : this.productoService.crear(datos);

    peticion.subscribe({
      next: () => {
        this.mensaje.set(editando ? 'Producto actualizado' : 'Producto creado');
        this.cerrarFormulario();
        this.cargar();
      },
      error: (err: HttpErrorResponse) => 
        this.error.set(`No se pudo guardar el producto (error ${err.status})`)
    });
  }

  eliminar(producto: Producto): void {
    if (!confirm(`¿Eliminar el producto "${producto.nombre}"?`)){
      return;
    }  
    this.limpiarMensajes();

    this.productoService.eliminar(producto.id).subscribe({
      next: () => {
        this.mensaje.set('Producto eliminado');
        this.cargar();
      },
      error: () => this.error.set('No se pudo eliminar el producto')
    });
  }

  private limpiarMensajes(): void {
    this.error.set('');
    this.mensaje.set('');
  }
}
