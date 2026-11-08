import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Usuario } from '../models/usuario';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    private http = inject(HttpClient);
    private url = `${environment.apiUrl}/api/usuarios`;

    listar(): Observable<Usuario[]>{
        return this.http.get<Usuario[]>(this.url);
    }
}
