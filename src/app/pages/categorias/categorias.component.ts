import { Component, OnInit, inject, signal } from '@angular/core';
import { CategoriaService } from '../../core/services/categoria.service';
import { Categoria, CategoriaRequest } from '../../core/models/categoria';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../../core/services/auth.service';
import {CategoriaFormComponent} from '../../components/categoria-form/categoria-form.component';

@Component({
  imports: [CategoriaFormComponent],
  selector: 'app-categorias',
  styleUrl: './categorias.component.css',
  templateUrl: './categorias.component.html',
})
export class CategoriasComponent implements OnInit {

  private categoriaService = inject(CategoriaService);
  protected authService = inject(AuthService);

  categorias = signal<Categoria[]>([]);
  mostrarFormulario = signal(false);
  categoriaEditando = signal<Categoria | null>(null);
  error = signal('');
  mensaje = signal('');

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.categoriaService.listar().subscribe({
      next: datos => this.categorias.set(datos),
      error: () => this.error.set('No se pudieron cargar las categorías')
    });
  }
 
  nueva(): void {
    this.categoriaEditando.set(null);
    this.mostrarFormulario.set(true);
    this.limpiarMensajes();
  }

  editar(categoria: Categoria): void {
    this.categoriaEditando.set(categoria);
    this.mostrarFormulario.set(true);
    this.limpiarMensajes();
  }

  cerrarFormulario(): void {
    this.mostrarFormulario.set(false);
    this.categoriaEditando.set(null);
  }

  guardar(datos: CategoriaRequest): void {
    const editando = this.categoriaEditando();
    
    const peticion = editando 
    ? this.categoriaService.actualizar(editando.id, datos) 
    : this.categoriaService.crear(datos);

    peticion.subscribe({
      next: () => {
        this.mensaje.set(editando ? 'Categoría actualizada' : 'Categoría creada');
        this.cargar();
        this.cerrarFormulario();
      },
      error: () => this.error.set('No se pudo guardar la categoría')
    });
  }

  eliminar(categoria: Categoria): void {
    if (!confirm(`¿Eliminar la categoría "${categoria.nombre}"?`)) {
      return;
    }
    this.limpiarMensajes();

    this.categoriaService.eliminar(categoria.id).subscribe({
      next: () => {
        this.mensaje.set('Categoría eliminada');
        this.cargar();
      },
      error: (err: HttpErrorResponse) => { 
        if (err.status === 409) {
          this.error.set('No se puede eliminar: la categoría tiene productos asociados');
        } else {
          this.error.set('No se pudo eliminar la categoría');
        }
      }
    });
  }

  private limpiarMensajes(): void {
    this.error.set('');
    this.mensaje.set('');
  }
}
