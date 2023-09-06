import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URL_SERVICES } from '../../config/urlserver.config';
import { AuthService } from '../auth.service';

import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpcionService {
  basepath = URL_SERVICES;

  selectEntidad = {
    IdOpcion: null,
    IdMenu: null,
    Nombre: '',
    OrdenMenu: '',
    Pagina: '',
  };

  menus = [];

  constructor(private http: HttpClient, private authService: AuthService) { }

  cargar_opciones() {    
    const url = `${this.basepath}seguridad/generales/opciones`;

    return this.http.get(url)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  eliminar_opciones(id){
    const url = `${this.basepath}seguridad/generales/opciones/${id}`;

    return this.http.delete(url)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  insertar_opciones(entidadForm){
    const url = `${this.basepath}seguridad/generales/opciones/${this.authService.credenciales.userId}`;

    const params = {
      IdMenu: entidadForm.IdMenu,
      Nombre: entidadForm.Nombre,
      OrdenMenu: entidadForm.OrdenMenu,
      Pagina: entidadForm.Pagina
    };

    return this.http.put(url, params)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  actualizar_opciones(entidadForm){
    const id = entidadForm.IdOpcion;
    const url = `${this.basepath}seguridad/generales/opciones/${this.authService.credenciales.userId}/${id}`;

    const params = {
      IdMenu: entidadForm.IdMenu,
      Nombre: entidadForm.Nombre,
      OrdenMenu: entidadForm.OrdenMenu,
      Pagina: entidadForm.Pagina
    };

    return this.http.post(url, params)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  cargar_menus() {    
    const url = `${this.basepath}seguridad/generales/menus`;

    return this.http.get(url)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }
}
