import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URL_SERVICES } from '../../config/urlserver.config';
import { AuthService } from '../auth.service';

import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusempleadoService {
  basepath = URL_SERVICES;

  selectEntidad = {
    IdStatusEmpleado: null,
    Nombre: '',
  };

  errorMessage:string;

  constructor(private http: HttpClient, public authService: AuthService) { }

  cargar_statusempleado() {   
    this.errorMessage = ""; 
    const url = `${this.basepath}nomina/statusempleado`;

    return this.http.get(url)
    .pipe(catchError(data => {
      this.errorMessage = data.error.mensaje;
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  eliminar_statusempleado(id){
    this.errorMessage = "";
    const url = `${this.basepath}nomina/statusempleado/${id}`;

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

  insertar_statusempleado(entidadForm){
    this.errorMessage = "";
    const url = `${this.basepath}nomina/statusempleado/${this.authService.credenciales.userId}`;

    const params = {
      IdStatusEmpleado: entidadForm.IdStatusEmpleado,
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

  actualizar_statusempleado(entidadForm){
    this.errorMessage = "";
    const id = entidadForm.IdStatusEmpleado;
    const url = `${this.basepath}nomina/statusempleado/${this.authService.credenciales.userId}/${id}`;

    const params = {
      IdStatusEmpleado: entidadForm.IdStatusEmpleado,
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
