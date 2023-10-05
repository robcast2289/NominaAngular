import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URL_SERVICES } from '../../config/urlserver.config';
import { AuthService } from '../auth.service';

import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  basepath = URL_SERVICES;

  /* selectEntidad = {
    IdEmpleado: null,
    IdPersona: null,
    IdSucursal: null,
    FechaContratacion: null,
    IdPuesto: null,
    IdStatusEmpleado: null,
    IngresoSueldoBase: null,
    IngresoBonificacionDecreto: null,
    IngresoOtrosIngresos: null,
    DescuentoIgss: null,
    DescuentoIsr: null,
    DescuentoInasistencias: null,
  }; */
  selectEntidad = {
    IdEmpleado: null,
    Nombre: null,
    Apellido: null,
    FechaContratacion: null,    
  };

  errorMessage:string;

  constructor(private http: HttpClient, public authService: AuthService) { }

  cargar_empleado() {   
    this.errorMessage = ""; 
    const url = `${this.basepath}nomina/empleado`;

    return this.http.get(url)
    .pipe(catchError(data => {
      this.errorMessage = data.error.mensaje;
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  eliminar_empleado(id){
    this.errorMessage = "";
    const url = `${this.basepath}nomina/empleado/${id}`;

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

  insertar_empleado(entidadForm){
    this.errorMessage = "";
    const url = `${this.basepath}nomina/empleado/${this.authService.credenciales.userId}`;

    const params = {
      IdEmpleado: entidadForm.IdEmpleado,
      IdPersona: entidadForm.IdInasistencia,
      FechaContratacion: entidadForm.FechaInicial+"T00:00:00.000Z",
    };

    return this.http.put(url, params)
    .pipe(catchError(data => {
      this.errorMessage = data.error.mensaje;
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }
}
