import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URL_SERVICES } from '../../config/urlserver.config';
import { AuthService } from '../auth.service';

import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  basepath = URL_SERVICES;

  selectEntidad = {
    IdDepartamento: null,
    Nombre: null,
    IdEmpresa: null,
  };

  errorMessage:string;

  empresas = [];

  constructor(private http: HttpClient, public authService: AuthService) { }

  cargar_departamento() {   
    this.errorMessage = ""; 
    const url = `${this.basepath}rrhh/departamento`;

    return this.http.get(url)
    .pipe(catchError(data => {
      this.errorMessage = data.error.mensaje;
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  eliminar_departamento(id){
    this.errorMessage = "";
    const url = `${this.basepath}rrhh/departamento/${id}`;

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

  insertar_departamento(entidadForm){
    this.errorMessage = "";
    const url = `${this.basepath}rrhh/departamento/${this.authService.credenciales.userId}`;

    const params = {
      IdDepartamento: entidadForm.IdDepartamento,
      Nombre: entidadForm.Nombre,
      IdEmpresa: entidadForm.IdEmpresa,
    };

    return this.http.put(url, params)
    .pipe(catchError(data => {
      this.errorMessage = data.error.mensaje;
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  actualizar_departamento(entidadForm){
    this.errorMessage = "";
    const id = entidadForm.IdDepartamento;
    const url = `${this.basepath}rrhh/departamento/${this.authService.credenciales.userId}/${id}`;

    const params = {
      IdDepartamento: entidadForm.IdDepartamento,
      Nombre: entidadForm.Nombre,
      IdEmpresa: entidadForm.IdEmpresa,
    };

    return this.http.post(url, params)
    .pipe(catchError(data => {
      this.errorMessage = data.error.mensaje;
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
