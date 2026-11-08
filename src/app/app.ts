import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { MenuComponent } from './components/menu/menu.component';
@Component({
  imports: [RouterOutlet, MenuComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected authService = inject (AuthService);
}
