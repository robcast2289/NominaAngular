import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URL_SERVICES } from '../../config/urlserver.config';
import { AuthService } from '../auth.service';

import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModuloService {
  basepath = URL_SERVICES;

  selectEntidad = {
    IdModulo: null,
    Nombre: '',
    OrdenMenu: ''
  };

  constructor(private http: HttpClient, public authService: AuthService) { }

  cargar_modulos() {    
    const url = `${this.basepath}seguridad/generales/modulos`;

    return this.http.get(url)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  eliminar_modulo(id){
    const url = `${this.basepath}seguridad/generales/modulos/${id}`;

    return this.http.delete(url)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  insertar_modulo(moduloForm){
    const url = `${this.basepath}seguridad/generales/modulos/${this.authService.credenciales.userId}`;

    const params = {
      Nombre: moduloForm.Nombre,
      OrdenMenu: moduloForm.OrdenMenu
    };

    return this.http.put(url, params)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  actualizar_modulo(moduloForm){
    const id = moduloForm.IdModulo;
    const url = `${this.basepath}seguridad/generales/modulos/${this.authService.credenciales.userId}/${id}`;

    const params = {
      Nombre: moduloForm.Nombre,
      OrdenMenu: moduloForm.OrdenMenu
    };

    return this.http.post(url, params)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }
}
