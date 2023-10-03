import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URL_SERVICES } from '../../config/urlserver.config';
import { AuthService } from '../auth.service';

import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PuestoService {
  basepath = URL_SERVICES;

  selectEntidad = {
    IdPuesto: null,
    Nombre: null,
    IdDepartamento: null,
  };

  errorMessage:string;

  departamentos = [];

  constructor(private http: HttpClient, public authService: AuthService) { }

  cargar_puesto() {   
    this.errorMessage = ""; 
    const url = `${this.basepath}rrhh/puesto`;

    return this.http.get(url)
    .pipe(catchError(data => {
      this.errorMessage = data.error.mensaje;
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  eliminar_puesto(id){
    this.errorMessage = "";
    const url = `${this.basepath}rrhh/puesto/${id}`;

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

  insertar_puesto(entidadForm){
    this.errorMessage = "";
    const url = `${this.basepath}rrhh/puesto/${this.authService.credenciales.userId}`;

    const params = {
      IdPuesto: entidadForm.IdPuesto,
      Nombre: entidadForm.Nombre,
      IdDepartamento: entidadForm.IdDepartamento,
    };

    return this.http.put(url, params)
    .pipe(catchError(data => {
      this.errorMessage = data.error.mensaje;
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  actualizar_puesto(entidadForm){
    this.errorMessage = "";
    const id = entidadForm.IdPuesto;
    const url = `${this.basepath}rrhh/puesto/${this.authService.credenciales.userId}/${id}`;

    const params = {
      IdPuesto: entidadForm.IdPuesto,
      Nombre: entidadForm.Nombre,
      IdDepartamento: entidadForm.IdDepartamento,
    };

    return this.http.post(url, params)
    .pipe(catchError(data => {
      this.errorMessage = data.error.mensaje;
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  cargar_departamentos() {    
    const url = `${this.basepath}rrhh/departamento`;

    return this.http.get(url)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }
}
