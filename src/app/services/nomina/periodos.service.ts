import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URL_SERVICES } from '../../config/urlserver.config';
import { AuthService } from '../auth.service';

import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeriodosService {
  basepath = URL_SERVICES;

  selectEntidad = {
    Anio: null,
    Mes: null,
    FechaInicio: null,
    FechaFin: null,
  };

  errorMessage:string;

  constructor(private http: HttpClient, public authService: AuthService) { }

  cargar_periodoplanilla() {   
    this.errorMessage = ""; 
    const url = `${this.basepath}nomina/periodoplanilla`;

    return this.http.get(url)
    .pipe(catchError(data => {
      this.errorMessage = data.error.mensaje;
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  eliminar_periodoplanilla(id){
    this.errorMessage = "";
    const url = `${this.basepath}nomina/periodoplanilla/${id}`;

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

  insertar_periodoplanilla(entidadForm){
    this.errorMessage = "";
    const url = `${this.basepath}nomina/periodoplanilla/${this.authService.credenciales.userId}`;

    const params = {
      Anio: entidadForm.Anio,
      Mes: entidadForm.Mes,
      FechaInicio: entidadForm.FechaInicio,
      FechaFin: entidadForm.FechaFin,
    };

    return this.http.put(url, params)
    .pipe(catchError(data => {
      this.errorMessage = data.error.mensaje;
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  /* actualizar_periodoplanilla(entidadForm){
    this.errorMessage = "";
    const anio = entidadForm.Anio;
    const mes = entidadForm.Mes;
    const url = `${this.basepath}nomina/periodoplanilla/${this.authService.credenciales.userId}/${anio}/${mes}`;

    const params = {
      Anio: entidadForm.Anio,
      Mes: entidadForm.Mes,
      FechaInicio: entidadForm.FechaInicio,
      FechaFin: entidadForm.FechaFin,
    };

    return this.http.post(url, params)
    .pipe(catchError(data => {
      this.errorMessage = data.error.mensaje;
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  } */
}
