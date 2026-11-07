import { Categoria } from './categoria';

export interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    cantidad: number;
    categoria: Categoria;
}

export interface ProductoRequest {
    nombre: string;
    descripcion: string;
    precio: number;
    cantidad: number;
    categoriaId: number;
}
