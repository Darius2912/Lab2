import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { ProductosComponent } from './pages/productos/productos.component';
import {CategoriasComponent} from './pages/categorias/categorias.component';
import {UsuariosComponent} from './pages/usuarios/usuarios.component';
import { authGuard } from './core/guards/auth-guard';
import { adminGuard } from './core/guards/admin-guard';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'registro', component: RegistroComponent},
    {path: 'productos', component: ProductosComponent, canActivate: [authGuard]},
    {path: 'categorias', component: CategoriasComponent, canActivate: [authGuard]},
    {path: 'usuarios', component: UsuariosComponent, canActivate: [authGuard, adminGuard]},
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: '**', redirectTo: 'login'}
];