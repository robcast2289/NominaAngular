import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

import { URL_SERVICES } from '../config/urlserver.config';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  basepath = URL_SERVICES;
  menu_all = [];
  titleActive: string;

  constructor(private http: HttpClient) { }

  menu_get(userId, token) {
    const url = `${this.basepath}User/menu/${userId}`;

    return this.http.get(url);
  }

  permisosOpcion(userId,buscarUrl){
    buscarUrl = buscarUrl.substring(1);
    buscarUrl = buscarUrl.replaceAll("/","-");
    const url = `${this.basepath}seguridad/generales/opciones/buscapermisos/${userId}/${buscarUrl}`;
    return this.http.get(url)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }));
  }
}
