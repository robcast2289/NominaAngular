import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URL_SERVICES } from '../../config/urlserver.config';
import { AuthService } from '../auth.service';

import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioroleService {
  basepath = URL_SERVICES;

  selectEntidad = {
    IdUsuario: null,
    IdRole: null,
  };
  selectEntidadPregunta = {
    IdPregunta: null,
    Pregunta: null,
    Respuesta: null,
  };
  
  roles = [];

  constructor(private http: HttpClient, private authService: AuthService, private router:Router) { }

  cargar_usuario(id) {    
    const url = `${this.basepath}seguridad/generales/usuarios/${id}`;

    return this.http.get(url)
    .pipe(catchError(data => {
      this.router.navigate(["404notfound"]);
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  cargar_usuarioroles(id) {    
    const url = `${this.basepath}seguridad/generales/usuarioroles/${id}`;

    return this.http.get(url)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }
  
  eliminar_usuarioroles(idusuario,idrole){
    const url = `${this.basepath}seguridad/generales/usuarioroles/${idusuario}/${idrole}`;

    return this.http.delete(url)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  insertar_usuarioroles(IdUsuario,entidadForm){
    const url = `${this.basepath}seguridad/generales/usuarioroles/${this.authService.credenciales.userId}`;

    const params = {
      IdUsuario: IdUsuario,
      IdRole: entidadForm.IdRole,
    };

    return this.http.put(url, params)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }


  cargar_roles() {    
    const url = `${this.basepath}seguridad/generales/roles`;

    return this.http.get(url)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  cargar_usuariopregunta(id) {    
    const url = `${this.basepath}seguridad/generales/usuariopregunta/${id}`;

    return this.http.get(url)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }
}
