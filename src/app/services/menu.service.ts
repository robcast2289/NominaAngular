import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
}
