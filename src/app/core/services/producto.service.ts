import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Producto, ProductoRequest } from '../models/producto';

@Injectable({providedIn:'root'})
export class ProductoService {

    private http = inject(HttpClient);
    private url = `${environment.apiUrl}/api/productos`

    listar(): Observable<Producto[]> {
        return this.http.get<Producto[]>(this.url);
    }

    obtner(id: number): Observable<Producto> {
        return this.http.get<Producto>(`${this.url}/${id}`);
    }

    crear(datos: ProductoRequest): Observable<Producto> {
        return this.http.post<Producto>(this.url, datos);
    }

    actualizar(id: number, datos: ProductoRequest): Observable<Producto> {
        return this.http.put<Producto>(`${this.url}/${id}`, datos);
    }

    eliminar(id:number): Observable<void> {
        return this.http.delete<void>(`${this.url}/${id}`);
    }
}
