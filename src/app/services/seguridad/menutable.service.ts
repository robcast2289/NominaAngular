import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URL_SERVICES } from '../../config/urlserver.config';
import { AuthService } from '../auth.service';

import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuTableService {
  basepath = URL_SERVICES;

  selectEntidad = {
    IdMenu: null,
    IdModulo: null,
    Nombre: '',
    OrdenMenu: ''
  };

  modulos = [];

  constructor(private http: HttpClient, public authService: AuthService) { }

  cargar_menus() {    
    const url = `${this.basepath}seguridad/generales/menus`;

    return this.http.get(url)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  eliminar_menus(id){
    const url = `${this.basepath}seguridad/generales/menus/${id}`;

    return this.http.delete(url)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  insertar_menus(entidadForm){
    const url = `${this.basepath}seguridad/generales/menus/${this.authService.credenciales.userId}`;

    const params = {
      IdModulo: entidadForm.IdModulo,
      Nombre: entidadForm.Nombre,
      OrdenMenu: entidadForm.OrdenMenu
    };

    return this.http.put(url, params)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  actualizar_menus(entidadForm){
    const id = entidadForm.IdMenu;
    const url = `${this.basepath}seguridad/generales/menus/${this.authService.credenciales.userId}/${id}`;

    const params = {
      IdModulo: entidadForm.IdModulo,
      Nombre: entidadForm.Nombre,
      OrdenMenu: entidadForm.OrdenMenu
    };

    return this.http.post(url, params)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  cargar_modulos() {    
    const url = `${this.basepath}seguridad/generales/modulos`;

    return this.http.get(url)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }
}
