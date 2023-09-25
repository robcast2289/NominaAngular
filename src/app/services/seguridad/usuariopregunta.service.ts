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
export class UsuariopreguntaService {
  basepath = URL_SERVICES;

  selectEntidad = {
    IdUsuario: null,
    IdRole: null,
  };

  constructor(private http: HttpClient, private authService: AuthService, private router:Router) { }

  cargar_usuariopregunta(id) {    
    const url = `${this.basepath}seguridad/generales/usuariopregunta/${id}`;

    return this.http.get(url)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }

}
