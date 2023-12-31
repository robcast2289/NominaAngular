import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URL_SERVICES } from '../../config/urlserver.config';
import { AuthService } from '../auth.service';

import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InasistenciaService {
  basepath = URL_SERVICES;

  selectEntidad = {
    IdInasistencia: null,
    IdEmpleado: null,
    FechaInicial: null,
    FechaFinal: null,
    MotivoInasistencia: null
  };

  errorMessage:string;

  empleados = [];

  constructor(private http: HttpClient, public authService: AuthService) { }

  cargar_inasistencia() {   
    this.errorMessage = ""; 
    const url = `${this.basepath}nomina/inasistencia`;

    return this.http.get(url)
    .pipe(catchError(data => {
      this.errorMessage = data.error.mensaje;
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  eliminar_inasistencia(id){
    this.errorMessage = "";
    const url = `${this.basepath}nomina/inasistencia/${id}`;

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

  insertar_inasistencia(entidadForm){
    this.errorMessage = "";
    const url = `${this.basepath}nomina/inasistencia/${this.authService.credenciales.userId}`;

    const params = {
      IdInasistencia: entidadForm.IdInasistencia,
      IdEmpleado: entidadForm.IdEmpleado,
      FechaInicial: entidadForm.FechaInicial+"T00:00:00.000Z",
      FechaFinal: entidadForm.FechaFinal+"T00:00:00.000Z",
      MotivoInasistencia: entidadForm.MotivoInasistencia,
    };

    return this.http.put(url, params)
    .pipe(catchError(data => {
      this.errorMessage = data.error.mensaje;
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  actualizar_inasistencia(entidadForm){
    this.errorMessage = "";
    const id = entidadForm.IdInasistencia;
    const url = `${this.basepath}nomina/inasistencia/${this.authService.credenciales.userId}/${id}`;

    const params = {
      IdInasistencia: entidadForm.IdInasistencia,
      IdEmpleado: entidadForm.IdEmpleado,
      FechaInicial: entidadForm.FechaInicial+"T00:00:00.000Z",
      FechaFinal: entidadForm.FechaFinal+"T00:00:00.000Z",
      MotivoInasistencia: entidadForm.MotivoInasistencia,
    };

    return this.http.post(url, params)
    .pipe(catchError(data => {
      this.errorMessage = data.error.mensaje;
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  cargar_empleados() {    
    const url = `${this.basepath}nomina/empleadocontratado`;

    return this.http.get(url)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }
}
