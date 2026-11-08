import { Component, OnInit, inject, signal } from '@angular/core';
import { UsuarioService } from '../../core/services/usuario.service';
import { Usuario } from '../../core/models/usuario';

@Component({
  imports: [],
  selector: 'app-usuarios',
  styleUrl: './usuarios.component.css',
  templateUrl: './usuarios.component.html',
})
export class UsuariosComponent implements OnInit {

  private usuarioService = inject(UsuarioService);

  usuarios = signal<Usuario[]>([]);
  error = signal('');

  ngOnInit(): void {
    this.usuarioService.listar().subscribe({
      next: datos => this.usuarios.set(datos),
      error: () => this.error.set('No se pudieron cargar los usuarios')
    });
  }
}
