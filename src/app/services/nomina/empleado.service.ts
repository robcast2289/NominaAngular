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
    IdPersona: null,
    Nombre: null,
    Apellido: null,
    FechaNacimiento: null,
    IdGenero: null,
    IdEstadoCivil: null,
    Direccion: null,
    Telefono: null,
    CorreoElectronico: null,
    IdSucursal: null,
    IdDepartamento: null,
    IdPuesto: null,
    FechaContratacion: null,   
    IdStatusEmpleado: null,
    IngresoSueldoBase: null,
    IngresoBonificacionDecreto: null,
    IngresoOtrosIngresos: null,
    DescuentoIgss: null,
    DescuentoIsr: null,
    DescuentoInasistencias: null, 
  };

  errorMessage:string;

  generos = [];
  estadosciviles = [];
  sucursales = [];
  departamentos = [];
  puestos = [];
  statusempleados = [];
  documentos = [];
  cuentasbancarias = []
  tipodocumentos = [];
  bancos = [];

  constructor(private http: HttpClient, public authService: AuthService, private router:Router) { }

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

  cargar_empleado_id(idempleado) {   
    this.errorMessage = ""; 
    const url = `${this.basepath}nomina/empleado/${idempleado}`;

    return this.http.get(url)
    .pipe(catchError(data => {
      this.router.navigate(["404notfound"]);
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
      Nombre: entidadForm.Nombre,
      Apellido: entidadForm.Apellido,
      FechaNacimiento: entidadForm.FechaNacimiento+"T00:00:00.000Z",
      IdGenero: entidadForm.IdGenero,
      IdEstadoCivil: entidadForm.IdEstadoCivil,
      Direccion: entidadForm.Direccion,
      Telefono: entidadForm.Telefono,
      CorreoElectronico: entidadForm.CorreoElectronico,
      IdSucursal: entidadForm.IdSucursal,
      IdPuesto: entidadForm.IdPuesto,
      FechaContratacion: entidadForm.FechaContratacion+"T00:00:00.000Z",
      IdStatusEmpleado: entidadForm.IdStatusEmpleado,
      IngresoSueldoBase: entidadForm.IngresoSueldoBase,
      IngresoBonificacionDecreto: entidadForm.IngresoBonificacionDecreto,
      IngresoOtrosIngresos: entidadForm.IngresoOtrosIngresos,
      DescuentoIgss: entidadForm.DescuentoIgss,
      DescuentoIsr: entidadForm.DescuentoIsr,
      DescuentoInasistencias: entidadForm.DescuentoInasistencias,
    };
    console.log(params);
    return this.http.put(url, params)
    .pipe(catchError(data => {
      this.errorMessage = data.error.mensaje;
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  actualizar_empleado(entidadForm){
    this.errorMessage = "";
    const id = entidadForm.IdEmpleado;
    const url = `${this.basepath}nomina/empleado/${this.authService.credenciales.userId}/${id}`;

    const params = {
      IdEmpleado: entidadForm.IdEmpleado,
      IdPersona: entidadForm.IdPersona,
      Nombre: entidadForm.Nombre,
      Apellido: entidadForm.Apellido,
      FechaNacimiento: entidadForm.FechaNacimiento+"T00:00:00.000Z",
      IdGenero: entidadForm.IdGenero,
      IdEstadoCivil: entidadForm.IdEstadoCivil,
      Direccion: entidadForm.Direccion,
      Telefono: entidadForm.Telefono,
      CorreoElectronico: entidadForm.CorreoElectronico,
      IdSucursal: entidadForm.IdSucursal,
      IdPuesto: entidadForm.IdPuesto,
      FechaContratacion: entidadForm.FechaContratacion+"T00:00:00.000Z",
      IdStatusEmpleado: entidadForm.IdStatusEmpleado,
      IngresoSueldoBase: entidadForm.IngresoSueldoBase,
      IngresoBonificacionDecreto: entidadForm.IngresoBonificacionDecreto,
      IngresoOtrosIngresos: entidadForm.IngresoOtrosIngresos,
      DescuentoIgss: entidadForm.DescuentoIgss,
      DescuentoIsr: entidadForm.DescuentoIsr,
      DescuentoInasistencias: entidadForm.DescuentoInasistencias,
    };
    console.log(params);
    return this.http.post(url, params)
    .pipe(catchError(data => {
      this.errorMessage = data.error.mensaje;
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  limpiar_form(){
    this.selectEntidad = {
      IdEmpleado: null,
      IdPersona: null,
      Nombre: null,
      Apellido: null,
      FechaNacimiento: null,
      IdGenero: null,
      IdEstadoCivil: null,
      Direccion: null,
      Telefono: null,
      CorreoElectronico: null,
      IdSucursal: null,
      IdDepartamento: null,
      IdPuesto: null,
      FechaContratacion: null,   
      IdStatusEmpleado: null,
      IngresoSueldoBase: null,
      IngresoBonificacionDecreto: null,
      IngresoOtrosIngresos: null,
      DescuentoIgss: null,
      DescuentoIsr: null,
      DescuentoInasistencias: null, 
    };
  }

  insertar_documentopersona(datos){
    this.errorMessage = "";
    const url = `${this.basepath}rrhh/documentospersona/${this.authService.credenciales.userId}`;

    return this.http.put(url,datos)
    .pipe(catchError(data => {
      this.errorMessage = data.error.mensaje;
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  eliminar_documentopersona(idTipoDocumento,IdPersona){
    this.errorMessage = "";
    const url = `${this.basepath}rrhh/documentospersona/${idTipoDocumento}/${IdPersona}`;

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


  insertar_cuentabancariaempleado(datos){
    this.errorMessage = "";
    const url = `${this.basepath}nomina/cuentabancariaempleado/${this.authService.credenciales.userId}`;

    return this.http.put(url,datos)
    .pipe(catchError(data => {
      this.errorMessage = data.error.mensaje;
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  eliminar_cuentabancariaempleado(idcuenta){
    this.errorMessage = "";
    const url = `${this.basepath}nomina/cuentabancariaempleado/${idcuenta}`;

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


  cargar_genero(){
    const url = `${this.basepath}seguridad/generales/genero`;

    return this.http.get(url)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  cargar_estadocivil(){
    const url = `${this.basepath}rrhh/estadocivil`;

    return this.http.get(url)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  cargar_sucursal(){
    const url = `${this.basepath}seguridad/generales/sucursal`;

    return this.http.get(url)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  cargar_departamento(idempresa){
    const url = `${this.basepath}rrhh/departamentoporempresa/${idempresa}`;

    return this.http.get(url)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  cargar_puesto(iddepto){
    const url = `${this.basepath}rrhh/puestopordepto/${iddepto}`;

    return this.http.get(url)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  cargar_statusempleado(){
    const url = `${this.basepath}nomina/statusempleado`;

    return this.http.get(url)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  cargar_documentospersona(idpersona){
    const url = `${this.basepath}rrhh/documentospersona/${idpersona}`;

    return this.http.get(url)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  cargar_tipodocumento(){
    const url = `${this.basepath}rrhh/tipodocumento`;

    return this.http.get(url)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  cargar_cuentabancariaempleado(idempleado){
    const url = `${this.basepath}nomina/cuentabancariaempleado/${idempleado}`;

    return this.http.get(url)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  cargar_banco(){
    const url = `${this.basepath}banco/bancos`;

    return this.http.get(url)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }
}
