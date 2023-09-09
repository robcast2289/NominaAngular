import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URL_SERVICES } from '../../config/urlserver.config';
import { AuthService } from '../auth.service';

import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariotableService {
  basepath = URL_SERVICES;

  selectEntidad = {
    IdRole: null,
    Nombre: '',
  };

  constructor(private http: HttpClient, private authService: AuthService) { }

  cargar_usuarios() {    
    const url = `${this.basepath}seguridad/generales/usuarios`;

    return this.http.get(url)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  eliminar_usuarios(id){
    const url = `${this.basepath}seguridad/generales/usuarios/${id}`;

    return this.http.delete(url)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  insertar_usuarios(entidadForm){
    const url = `${this.basepath}seguridad/generales/usuarios/${this.authService.credenciales.userId}`;

    const params = {
      Nombre: entidadForm.Nombre
    };

    return this.http.put(url, params)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  actualizar_usuarios(entidadForm){
    const id = entidadForm.IdRole;
    const url = `${this.basepath}seguridad/generales/usuarios/${this.authService.credenciales.userId}/${id}`;

    const params = {
      Nombre: entidadForm.Nombre
    };

    return this.http.post(url, params)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }
}
