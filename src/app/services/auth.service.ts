import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay, map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { URL_SERVICES } from '../config/urlserver.config';
import { Credenciales } from '../config/credenciales.interface';

declare var require: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  basepath = URL_SERVICES;
  isLoggedIn = false;
  redirectUrl: string;
  userId: string;
  credenciales: Credenciales = {};
  
  constructor(private http: HttpClient) { }

  login(user, password) {
    /* npm install crypto-js */
    /*const CryptoJS = require('crypto-js');
    const key = CryptoJS.enc.Hex.parse('0123456789abcdef0123456789abcdef');
    const iv =  CryptoJS.enc.Hex.parse('abcdef9876543210abcdef9876543210');

    
    const params = {
      correo: CryptoJS.AES.encrypt(user, key, {iv}).toString(),
      contrasena: CryptoJS.AES.encrypt(password, key, {iv}).toString()
    };*/
    
    const url = `${this.basepath}User/login`;

    const params = {
      IdUsuario: user,
      Password: password
    }

    const headers = {
      "Accept":"*/*",
      "User-Agent":"Angular"
    }

    return this.http.post(url, params,{headers} );
  }

  logout() {
    this.isLoggedIn = false;
    this.guardar_storage();
    this.credenciales = {};
  }

  cargar_credenciales(nombre: string,
                      usuario: string,
                      accessToken: string,
                      expiresAt: number,
                      userId: string) {
    this.credenciales.nombre = nombre;
    this.credenciales.usuario = usuario;
    this.credenciales.accessToken = accessToken;
    this.credenciales.expiresIn = expiresAt;
    this.credenciales.userId = userId;
  }

  guardar_storage() {
    if (this.isLoggedIn) {
      localStorage.setItem('nombre', this.credenciales.nombre);
      localStorage.setItem('usuario', this.credenciales.usuario);
      localStorage.setItem('accessToken', this.credenciales.accessToken);
      localStorage.setItem('expiresAt', this.credenciales.expiresIn.toString());
      localStorage.setItem('userId', this.credenciales.userId);
    } else {
      localStorage.removeItem('nombre');
      localStorage.removeItem('usuario');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('expiresAt');
      localStorage.removeItem('userId');
    }
  }

  cargar_storage() {
    if (localStorage.getItem('nombre')) this.credenciales.nombre = localStorage.getItem('nombre');
    if (localStorage.getItem('usuario')) this.credenciales.usuario = localStorage.getItem('usuario');
    if (localStorage.getItem('accessToken')) this.credenciales.accessToken = localStorage.getItem('accessToken');
    if (localStorage.getItem('expiresAt')) this.credenciales.expiresIn = Number(localStorage.getItem('expiresAt'));
    if (localStorage.getItem('userId')) this.credenciales.userId = localStorage.getItem('userId');
  }
}
