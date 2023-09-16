import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URL_SERVICES } from '../../config/urlserver.config';
import { AuthService } from '../auth.service';

import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadousuarioService {
  basepath = URL_SERVICES;

  selectEntidad = {
    IdStatusUsuario:null,
    Nombre:null,
  };

  constructor(private http: HttpClient, public authService: AuthService) { }

  cargar_status_usuario() {    
    const url = `${this.basepath}seguridad/generales/statususuario`;

    return this.http.get(url)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }
}
