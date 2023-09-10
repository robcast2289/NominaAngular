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
    IdUsuario:null,
    UsuarioNuevo:null,
    Nombre:null,
    Apellido:null,
    FechaNacimiento:null,
    IdStatusUsuario:null,
    IdGenero:null,
    IdSucursal:null,
    TelefonoMovil:null,
    CorreoElectronico:null
  };

  status = [];
  generos = [];
  sucursales = [];

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
      UsuarioNuevo:entidadForm.UsuarioNuevo,
      Nombre:entidadForm.Nombre,
      Apellido:entidadForm.Apellido,
      FechaNacimiento:entidadForm.FechaNacimiento+"T00:00:00.000Z",
      IdStatusUsuario:entidadForm.IdStatusUsuario,
      IdGenero:entidadForm.IdGenero,
      IdSucursal:entidadForm.IdSucursal,
      TelefonoMovil:entidadForm.TelefonoMovil,
      CorreoElectronico:entidadForm.CorreoElectronico,
      Password:"!IXQORvSqqv"
    };

    console.log(params);

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

  cargar_status(){
    const url = `${this.basepath}seguridad/generales/statususuario`;

    return this.http.get(url)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  cargar_generos(){
    const url = `${this.basepath}seguridad/generales/genero`;

    return this.http.get(url)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  cargar_sucursales(){
    const url = `${this.basepath}seguridad/generales/sucursal`;

    return this.http.get(url)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }
}
