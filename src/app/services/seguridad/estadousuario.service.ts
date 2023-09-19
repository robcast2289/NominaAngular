import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URL_SERVICES } from '../../config/urlserver.config';
import { AuthService } from '../auth.service';

import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadousuarioService {
  basepath = URL_SERVICES;

  selectEntidad = {
    IdStatusUsuario:null,
    Nombre:null,
  };

  constructor(private http: HttpClient, public authService: AuthService) { }

  cargar_status_usuario() {    
    const url = `${this.basepath}seguridad/generales/statususuario`;

    return this.http.get(url)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  eliminar_status_usuario(id){
    const url = `${this.basepath}seguridad/generales/statususuario/${id}`;

    return this.http.delete(url)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  insertar_status_usuario(entidadForm){
    const url = `${this.basepath}seguridad/generales/statususuario/${this.authService.credenciales.userId}`;

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

  actualizar_status_usuario(entidadForm){
    const id = entidadForm.IdStatusUsuario;
    const url = `${this.basepath}seguridad/generales/statususuario/${this.authService.credenciales.userId}/${id}`;

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
