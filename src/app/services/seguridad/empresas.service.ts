import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URL_SERVICES } from '../../config/urlserver.config';
import { AuthService } from '../auth.service';

import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {
  basepath = URL_SERVICES;

  selectEntidad = {
    IdEmpresa:null,
    Nombre:null,
    Direccion:null,
    Nit:null,
    PasswordCantidadMayusculas:0,
    PasswordCantidadMinusculas:0,
    PasswordCantidadCaracteresEspeciales:0,
    PasswordCantidadCaducidadDias:0,
    PasswordLargo:1,
    PasswordIntentosAntesDeBloquear:3,
    PasswordCantidadNumeros:0,
    PasswordCantidadPreguntasValidar:1
  };

  constructor(private http: HttpClient, public authService: AuthService) { }

  cargar_empresas() {    
    const url = `${this.basepath}seguridad/generales/empresa`;

    return this.http.get(url)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  eliminar_empresa(id){
    const url = `${this.basepath}seguridad/generales/empresa/${id}`;

    return this.http.delete(url)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  insertar_empresa(empresaForm){
    const url = `${this.basepath}seguridad/generales/empresa/${this.authService.credenciales.userId}`;

    const params = {
      Nombre:empresaForm.Nombre,
      Direccion:empresaForm.Direccion,
      Nit:empresaForm.Nit,
      PasswordCantidadMayusculas:empresaForm.PasswordCantidadMayusculas,
      PasswordCantidadMinusculas:empresaForm.PasswordCantidadMinusculas,
      PasswordCantidadCaracteresEspeciales:empresaForm.PasswordCantidadCaracteresEspeciales,
      PasswordCantidadCaducidadDias:empresaForm.PasswordCantidadCaducidadDias,
      PasswordLargo:empresaForm.PasswordLargo,
      PasswordIntentosAntesDeBloquear:empresaForm.PasswordIntentosAntesDeBloquear,
      PasswordCantidadNumeros:empresaForm.PasswordCantidadNumeros,
      PasswordCantidadPreguntasValidar:empresaForm.PasswordCantidadPreguntasValidar
    };

    return this.http.put(url, params)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  actualizar_empresa(empresaForm){
    const id = empresaForm.Idempresa;
    const url = `${this.basepath}seguridad/generales/empresa/${this.authService.credenciales.userId}/${id}`;

    const params = {
      Nombre:empresaForm.Nombre,
      Direccion:empresaForm.Direccion,
      Nit:empresaForm.Nit,
      PasswordCantidadMayusculas:empresaForm.PasswordCantidadMayusculas,
      PasswordCantidadMinusculas:empresaForm.PasswordCantidadMinusculas,
      PasswordCantidadCaracteresEspeciales:empresaForm.PasswordCantidadCaracteresEspeciales,
      PasswordCantidadCaducidadDias:empresaForm.PasswordCantidadCaducidadDias,
      PasswordLargo:empresaForm.PasswordLargo,
      PasswordIntentosAntesDeBloquear:empresaForm.PasswordIntentosAntesDeBloquear,
      PasswordCantidadNumeros:empresaForm.PasswordCantidadNumeros,
      PasswordCantidadPreguntasValidar:empresaForm.PasswordCantidadPreguntasValidar
    };

    return this.http.post(url, params)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }
}
