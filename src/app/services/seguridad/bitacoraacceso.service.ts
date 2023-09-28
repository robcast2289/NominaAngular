import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URL_SERVICES } from '../../config/urlserver.config';
import { AuthService } from '../auth.service';

import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BitacoraaccesoService {
  basepath = URL_SERVICES;

  selectEntidad = {
    IdUsuario: null,
    TipoAcceso: null,
    FechaAcceso: null,
    DireccionIP: null,
    SistemaOperativo: null,
    Dispositivo: null,
    Browser: null
  };

  constructor(private http: HttpClient, public authService: AuthService) { }

  cargar_bitacora() {    
    const url = `${this.basepath}seguridad/generales/bitacoraacceso`;

    return this.http.get(url)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }
}
