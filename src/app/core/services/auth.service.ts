import { Injectable, inject, signal} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import {LoginRequest, LoginResponse, RegistroRequest} from '../models/auth';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private http = inject(HttpClient);
    private router = inject(Router);

    private url = `${environment.apiUrl}/auth`;
    private readonly TOKEN_KEY = 'token';

    private token = signal<string | null>(localStorage.getItem(this.TOKEN_KEY));

    login(datos: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.url}/login`, datos).pipe(
            tap((response: LoginResponse) => {
                this.token.set(response.token);
                localStorage.setItem(this.TOKEN_KEY, response.token);
            })
        );
    }

    registrar(datos: RegistroRequest): Observable<Usuario> {
        return this.http.post<Usuario>(`${this.url}/register`, datos);
    }

    logout(): void {
        this.token.set(null);
        localStorage.removeItem(this.TOKEN_KEY);
        this.router.navigate(['/login']);
    }

    getToken(): string | null {
        return this.token();
    }

    estaAutenticado(): boolean {
        const payload = this.leerPayload();
        if (!payload) {
            return false;
        }
        return payload.exp * 1000 > Date.now();
    }

    getRol(): string | null {
        return this.leerPayload()?.rol ?? null;
   }

   getUsername(): string | null {
        return this.leerPayload()?.sub ?? null;
   }

   esAdmin(): boolean {
    return this.getRol() === 'SUPER-ADMIN-ROLE';
   }

    private leerPayload(): any | null {
          const token = this.getToken();
          if (!token) {
                return null;
          }try {
            const parte = token.split('.')[1];
            const base64 = parte.replace(/-/g, '+').replace(/_/g, '/');
            return JSON.parse(atob(base64));
          } catch {
            return null;
          }
    }
}