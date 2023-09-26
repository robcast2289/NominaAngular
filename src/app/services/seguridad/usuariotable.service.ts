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
    CorreoElectronico:null,
    Password:null,
    Fotografia:null,
    UltimaFechaIngreso:null,
    IntentosDeAcceso:null,
    UltimaFechaCambioPassword:null,
    RequiereCambiarPassword:null
  };

  errorMessage:string;

  status = [];
  generos = [];
  sucursales = [];
  resetPass = [
    {RequiereCambiarPassword:0,Nombre:"No"},
    {RequiereCambiarPassword:1,Nombre:"Si"}
  ];
  empresa = {}

  constructor(private http: HttpClient, public authService: AuthService) { }

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
    this.errorMessage = "";
    const url = `${this.basepath}seguridad/generales/usuarios/${this.authService.credenciales.userId}`;

    const params = {
      IdUsuario:entidadForm.UsuarioNuevo,
      Nombre:entidadForm.Nombre,
      Apellido:entidadForm.Apellido,
      FechaNacimiento:entidadForm.FechaNacimiento+"T00:00:00.000Z",
      IdStatusUsuario:entidadForm.IdStatusUsuario,
      IdGenero:entidadForm.IdGenero,
      IdSucursal:entidadForm.IdSucursal,
      TelefonoMovil:entidadForm.TelefonoMovil,
      CorreoElectronico:entidadForm.CorreoElectronico,
      Password:this.authService.vigenereCipher(entidadForm.Password,this.authService.key),
      Fotografia:entidadForm.Fotografia,
      UltimaFechaIngreso:"",
      IntentosDeAcceso:0,
      UltimaFechaCambioPassword:"",
      RequiereCambiarPassword:entidadForm.RequiereCambiarPassword
    };

    const formData: FormData = new FormData();
    /* files.forEach(file => {
      //formData.append("image0",file);
      formData.append("image0","");
      console.log(file);
    }); */
    formData.append("data",JSON.stringify(params));

    return this.http.put(url, formData)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  actualizar_usuarios(entidadForm){
    this.errorMessage = "";
    const id = entidadForm.IdUsuario;
    const url = `${this.basepath}seguridad/generales/usuarios/${this.authService.credenciales.userId}/${id}`;

    const params = {
      IdUsuario:entidadForm.IdUsuario,
      Nombre:entidadForm.Nombre,
      Apellido:entidadForm.Apellido,
      FechaNacimiento:entidadForm.FechaNacimiento+"T00:00:00.000Z",
      IdStatusUsuario:entidadForm.IdStatusUsuario,
      IdGenero:entidadForm.IdGenero,
      IdSucursal:entidadForm.IdSucursal,
      TelefonoMovil:entidadForm.TelefonoMovil,
      CorreoElectronico:entidadForm.CorreoElectronico,
      Password:this.authService.vigenereCipher(entidadForm.Password,this.authService.key),
      Fotografia:entidadForm.Fotografia,
      UltimaFechaIngreso:"",
      IntentosDeAcceso:0,
      UltimaFechaCambioPassword:"",
      RequiereCambiarPassword:entidadForm.RequiereCambiarPassword
    };

    const formData: FormData = new FormData();
    formData.append("data",JSON.stringify(params));

    return this.http.post(url, formData)
    .pipe(catchError(data => {
      this.errorMessage = data.error.mensaje
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

  cargar_empresa(){
    const url = `${this.basepath}seguridad/generales/empresausuario/${this.authService.credenciales.userId}`;

    return this.http.get(url)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }
}
