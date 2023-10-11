import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URL_SERVICES } from '../../config/urlserver.config';
import { AuthService } from '../auth.service';

import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanillacabeceraService {
  basepath = URL_SERVICES;

  selectEntidad = {
    Anio: null,
    Mes: null,
  };

  errorMessage:string;

  meses = [
    {value:1,Name:"Enero"},
    {value:2,Name:"Febrero"},
    {value:3,Name:"Marzo"},
    {value:4,Name:"Abril"},
    {value:5,Name:"Mayo"},
    {value:6,Name:"Junio"},
    {value:7,Name:"Julio"},
    {value:8,Name:"Agosto"},
    {value:9,Name:"Septiembre"},
    {value:10,Name:"Octubre"},
    {value:11,Name:"Noviembre"},
    {value:12,Name:"Diciembre"},
  ]

  constructor(private http: HttpClient, public authService: AuthService) { }

  cargar_planillacabecera() {   
    this.errorMessage = ""; 
    const url = `${this.basepath}nomina/planillacabecera`;

    return this.http.get(url)
    .pipe(catchError(data => {
      this.errorMessage = data.error.mensaje;
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  eliminar_planillacabecera(anio,mes){
    this.errorMessage = "";
    const url = `${this.basepath}nomina/planillacabecera/${anio}/${mes}`;

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

  insertar_planillacabecera(entidadForm){
    this.errorMessage = "";
    const url = `${this.basepath}nomina/planillacabecera/${this.authService.credenciales.userId}`;

    const params = {
      Anio: entidadForm.Anio,
      Mes: entidadForm.Mes,
    };

    return this.http.put(url, params)
    .pipe(catchError(data => {
      this.errorMessage = data.error.mensaje;
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  actualizar_planillacabecera(entidadForm){
    this.errorMessage = "";
    const id = entidadForm.IdInasistencia;
    const url = `${this.basepath}nomina/planillacabecera/${this.authService.credenciales.userId}/${id}`;

    const params = {
      Anio: entidadForm.Anio,
      Mes: entidadForm.Mes,
    };

    return this.http.post(url, params)
    .pipe(catchError(data => {
      this.errorMessage = data.error.mensaje;
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }


  cargar_planillacabecera_id(anio,mes){
    this.errorMessage = ""; 
    const url = `${this.basepath}nomina/planillacabecera/${anio}/${mes}`;

    return this.http.get(url)
    .pipe(catchError(data => {
      this.errorMessage = data.error.mensaje;
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  cargar_planilladetalle(anio,mes){
    this.errorMessage = ""; 
    const url = `${this.basepath}nomina/planilladetalle/${anio}/${mes}`;

    return this.http.get(url)
    .pipe(catchError(data => {
      this.errorMessage = data.error.mensaje;
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  resetPlanilla(anio,mes){
    this.errorMessage = ""; 
    const url = `${this.basepath}nomina/planilladetalle/crear/${this.authService.credenciales.userId}`;

    const params = {
      Anio:anio,
      Mes:mes
    }

    return this.http.post(url,params)
    .pipe(catchError(data => {
      this.errorMessage = data.error.mensaje;
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  calcularPlanilla(anio,mes){
    this.errorMessage = ""; 
    const url = `${this.basepath}nomina/planilladetalle/calcular/${this.authService.credenciales.userId}`;

    const params = {
      Anio:anio,
      Mes:mes
    }

    return this.http.post(url,params)
    .pipe(catchError(data => {
      this.errorMessage = data.error.mensaje;
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  pagarPlanilla(anio,mes){
    this.errorMessage = ""; 
    const url = `${this.basepath}nomina/planilladetalle/pagar/${this.authService.credenciales.userId}`;

    const params = {
      Anio:anio,
      Mes:mes
    }

    return this.http.post(url,params)
    .pipe(catchError(data => {
      this.errorMessage = data.error.mensaje;
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }
}
