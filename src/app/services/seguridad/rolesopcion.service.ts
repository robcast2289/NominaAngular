import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URL_SERVICES } from '../../config/urlserver.config';
import { AuthService } from '../auth.service';

import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesopcionService {
  basepath = URL_SERVICES;

  selectEntidad = {
    IdRole: null,
    IdOpcion: null,
    Alta: null,
    Baja: null,
    Cambio: null,
    Imprimir: null,
    Exportar: null,
  };

  constructor(private http: HttpClient, private authService: AuthService) { }

  cargar_role(id) {    
    const url = `${this.basepath}seguridad/generales/roles/${id}`;

    return this.http.get(url)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  cargar_roleopciones(id) {    
    const url = `${this.basepath}seguridad/generales/rolesopcion/${id}`;

    return this.http.get(url)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }
  
  eliminar_roleopciones(id){
    const url = `${this.basepath}seguridad/generales/rolesopcion/${id}`;

    return this.http.delete(url)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  insertar_roleopciones(IdRole,entidadForm){
    const url = `${this.basepath}seguridad/generales/rolesopcion/${this.authService.credenciales.userId}`;

    const params = {
      IdRole: IdRole,
      IdOpcion: entidadForm.IdOpcion,
      Alta: entidadForm.Alta,
      Baja: entidadForm.Baja,
      Cambio: entidadForm.Cambio,
      Imprimir: entidadForm.Imprimir,
      Exportar: entidadForm.Exportar,
    };

    return this.http.put(url, params)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  actualizar_roleopciones(IdRole,entidadForm){
    const id = entidadForm.IdRole;
    const url = `${this.basepath}seguridad/generales/rolesopcion/${this.authService.credenciales.userId}/${id}`;

    const params = {
      IdRole: IdRole,
      IdOpcion: entidadForm.IdOpcion,
      Alta: entidadForm.Alta,
      Baja: entidadForm.Baja,
      Cambio: entidadForm.Cambio,
      Imprimir: entidadForm.Imprimir,
      Exportar: entidadForm.Exportar,
    };

    return this.http.post(url, params)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }
}
