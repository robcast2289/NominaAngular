import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URL_SERVICES } from '../../config/urlserver.config';
import { AuthService } from '../auth.service';

import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenerosService {
  basepath = URL_SERVICES;

  selectEntidad = {
    IdGenero:null,
    Nombre:null
  };

  constructor(private http: HttpClient, public authService: AuthService) { }

  cargar_generos() {    
    const url = `${this.basepath}seguridad/generales/genero`;

    return this.http.get(url)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  eliminar_generos(id){
    const url = `${this.basepath}seguridad/generales/genero/${id}`;

    return this.http.delete(url)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  insertar_generos(entidadForm){
    const url = `${this.basepath}seguridad/generales/genero/${this.authService.credenciales.userId}`;

    const params = {
      Nombre: entidadForm.Nombre
    };

    return this.http.put(url, params)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

  actualizar_generos(entidadForm){
    const id = entidadForm.IdGenero;
    const url = `${this.basepath}seguridad/generales/genero/${this.authService.credenciales.userId}/${id}`;

    const params = {
      Nombre: entidadForm.Nombre
    };

    return this.http.post(url, params)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }
}
