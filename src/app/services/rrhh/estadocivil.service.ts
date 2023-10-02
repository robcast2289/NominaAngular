import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URL_SERVICES } from '../../config/urlserver.config';
import { AuthService } from '../auth.service';

import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadocivilService {
  basepath = URL_SERVICES;

  selectEntidad = {
    IdEstadoCivil: null,
    Nombre: '',
  };

  errorMessage:string;

  constructor(private http: HttpClient, public authService: AuthService) { }

  cargar_estadocivil() {   
    this.errorMessage = ""; 
    const url = `${this.basepath}rrhh/estadocivil`;

    return this.http.get(url)
    .pipe(catchError(data => {
      this.errorMessage = data.error.mensaje;
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  eliminar_estadocivil(id){
    this.errorMessage = "";
    const url = `${this.basepath}rrhh/estadocivil/${id}`;

    return this.http.delete(url)
    .pipe(
      catchError(data => {
        //data.error.mensaje
        this.errorMessage = data.error.mensaje;
        return of(data).pipe(
          map(val => data.error)
        );
      })
    );
  }

  insertar_estadocivil(entidadForm){
    this.errorMessage = "";
    const url = `${this.basepath}rrhh/estadocivil/${this.authService.credenciales.userId}`;

    const params = {
      IdEstadoCivil: entidadForm.IdEstadoCivil,
      Nombre: entidadForm.Nombre,
    };

    return this.http.put(url, params)
    .pipe(catchError(data => {
      this.errorMessage = data.error.mensaje;
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  actualizar_estadocivil(entidadForm){
    this.errorMessage = "";
    const id = entidadForm.IdOpcion;
    const url = `${this.basepath}rrhh/estadocivil/${this.authService.credenciales.userId}/${id}`;

    const params = {
      IdEstadoCivil: entidadForm.IdEstadoCivil,
      Nombre: entidadForm.Nombre,
    };

    return this.http.post(url, params)
    .pipe(catchError(data => {
      this.errorMessage = data.error.mensaje;
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }
}
