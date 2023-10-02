import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URL_SERVICES } from '../../config/urlserver.config';
import { AuthService } from '../auth.service';

import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BancoService {
  basepath = URL_SERVICES;

  selectEntidad = {
    IdBanco: null,
    Nombre: '',
  };

  errorMessage:string;

  constructor(private http: HttpClient, public authService: AuthService) { }

  cargar_bancos() {   
    this.errorMessage = ""; 
    const url = `${this.basepath}banco/bancos`;

    return this.http.get(url)
    .pipe(catchError(data => {
      this.errorMessage = data.error.mensaje;
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  eliminar_banco(id){
    this.errorMessage = "";
    const url = `${this.basepath}banco/bancos/${id}`;

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

  insertar_banco(entidadForm){
    this.errorMessage = "";
    const url = `${this.basepath}banco/bancos/${this.authService.credenciales.userId}`;

    const params = {
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

  actualizar_banco(entidadForm){
    this.errorMessage = "";
    const id = entidadForm.IdBanco;
    const url = `${this.basepath}banco/bancos/${this.authService.credenciales.userId}/${id}`;

    const params = {
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
