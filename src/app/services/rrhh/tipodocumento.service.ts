import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URL_SERVICES } from '../../config/urlserver.config';
import { AuthService } from '../auth.service';

import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipodocumentoService {
  basepath = URL_SERVICES;

  selectEntidad = {
    IdTipoDocumento: null,
    Nombre: '',
  };

  errorMessage:string;

  constructor(private http: HttpClient, public authService: AuthService) { }

  cargar_tipodocumento() {   
    this.errorMessage = ""; 
    const url = `${this.basepath}rrhh/tipodocumento`;

    return this.http.get(url)
    .pipe(catchError(data => {
      this.errorMessage = data.error.mensaje;
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  eliminar_tipodocumento(id){
    this.errorMessage = "";
    const url = `${this.basepath}rrhh/tipodocumento/${id}`;

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

  insertar_tipodocumento(entidadForm){
    this.errorMessage = "";
    const url = `${this.basepath}rrhh/tipodocumento/${this.authService.credenciales.userId}`;

    const params = {
      IdTipoDocumento: entidadForm.IdTipoDocumento,
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

  actualizar_tipodocumento(entidadForm){
    this.errorMessage = "";
    const id = entidadForm.IdTipoDocumento;
    const url = `${this.basepath}rrhh/tipodocumento/${this.authService.credenciales.userId}/${id}`;

    const params = {
      IdTipoDocumento: entidadForm.IdTipoDocumento,
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
