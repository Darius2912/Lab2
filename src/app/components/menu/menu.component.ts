import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-menu',
  styleUrl: './menu.component.css',
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  protected authService = inject(AuthService);

  cerrarSesion(): void {
    this.authService.logout();
}
}