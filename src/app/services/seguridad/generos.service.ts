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
    IdSucursal:null,
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
}
