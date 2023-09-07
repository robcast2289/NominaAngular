import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URL_SERVICES } from '../../config/urlserver.config';
import { AuthService } from '../auth.service';

import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  basepath = URL_SERVICES;

  selectEntidad = {
    IdRole: null,
    Nombre: '',
  };

  constructor(private http: HttpClient, private authService: AuthService) { }

  cargar_roles() {    
    const url = `${this.basepath}seguridad/generales/roles`;

    return this.http.get(url)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  eliminar_roles(id){
    const url = `${this.basepath}seguridad/generales/roles/${id}`;

    return this.http.delete(url)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  insertar_roles(entidadForm){
    const url = `${this.basepath}seguridad/generales/roles/${this.authService.credenciales.userId}`;

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

  actualizar_roles(entidadForm){
    const id = entidadForm.IdRole;
    const url = `${this.basepath}seguridad/generales/roles/${this.authService.credenciales.userId}/${id}`;

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
