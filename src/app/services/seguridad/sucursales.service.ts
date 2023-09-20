import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URL_SERVICES } from '../../config/urlserver.config';
import { AuthService } from '../auth.service';

import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SucursalesService {
  basepath = URL_SERVICES;

  selectEntidad = {
    IdSucursal:null,
    Nombre:null,
    Direccion:null,
    IdEmpresa:null
  };

  empresas = [];

  constructor(private http: HttpClient, public authService: AuthService) { }

  cargar_sucursales() {    
    const url = `${this.basepath}seguridad/generales/sucursal`;

    return this.http.get(url)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  eliminar_sucursal(id){
    const url = `${this.basepath}seguridad/generales/sucursal/${id}`;

    return this.http.delete(url)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  insertar_sucursal(entidadForm){
    const url = `${this.basepath}seguridad/generales/sucursal/${this.authService.credenciales.userId}`;

    const params = {
      Nombre: entidadForm.Nombre,
      Direccion: entidadForm.Direccion,
      IdEmpresa: entidadForm.IdEmpresa
    };

    return this.http.put(url, params)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  actualizar_sucursal(entidadForm){
    const id = entidadForm.IdSucursal;
    const url = `${this.basepath}seguridad/generales/sucursal/${this.authService.credenciales.userId}/${id}`;

    const params = {
      Nombre: entidadForm.Nombre,
      Direccion: entidadForm.Direccion,
      IdEmpresa: entidadForm.IdEmpresa
    };

    return this.http.post(url, params)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  cargar_empresas() {    
    const url = `${this.basepath}seguridad/generales/empresa`;

    return this.http.get(url)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }
}
