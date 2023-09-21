import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay, map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { URL_SERVICES } from '../config/urlserver.config';
import { Credenciales } from '../config/credenciales.interface';

import { DeviceDetectorService } from 'ngx-device-detector';
import { browser } from 'protractor';

declare var require: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  key = "analisisdesistemas";
  basepath = URL_SERVICES;
  isLoggedIn = false;
  redirectUrl: string;
  userId: string;
  credenciales: Credenciales = {};
  deviceInfo = {
    os:null,
    device:null,
    browser:null
  }
  
  constructor(private http: HttpClient,private deviceService:DeviceDetectorService) {
    this.deviceInfoFunction();
   }

  login(user, password) {
    
    const url = `${this.basepath}User/login`;

    const params = {
      IdUsuario: user,
      Password: this.vigenereCipher(password,this.key)
    }

    const formData: FormData = new FormData();

    formData.append("data",JSON.stringify(params));
    formData.append("log",JSON.stringify(this.deviceInfo));

    const headers = {
      "Accept":"*/*",
      "User-Agent":"Angular"
    }

    return this.http.post(url, formData,{headers} );
  }


  tieneAccesoOpcion(buscarUrl){
    buscarUrl = buscarUrl.substring(1);
    buscarUrl = buscarUrl.replaceAll("/","-");
    const url = `${this.basepath}seguridad/generales/opciones/buscaruta/${this.credenciales.userId}/${buscarUrl}`;
    return this.http.get(url);
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
                      userId: string,
                      foto:string) {
    this.credenciales.nombre = nombre;
    this.credenciales.usuario = usuario;
    this.credenciales.accessToken = accessToken;
    this.credenciales.expiresIn = expiresAt;
    this.credenciales.userId = userId;
    this.credenciales.foto = foto;
  }

  guardar_storage() {
    if (this.isLoggedIn) {
      localStorage.setItem('nombre', this.credenciales.nombre);
      localStorage.setItem('usuario', this.credenciales.usuario);
      localStorage.setItem('accessToken', this.credenciales.accessToken);
      localStorage.setItem('expiresAt', this.credenciales.expiresIn.toString());
      localStorage.setItem('userId', this.credenciales.userId);
      localStorage.setItem('foto', this.credenciales.foto);
    } else {
      localStorage.removeItem('nombre');
      localStorage.removeItem('usuario');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('expiresAt');
      localStorage.removeItem('userId');
      localStorage.removeItem('foto');
    }
  }

  cargar_storage() {
    if (localStorage.getItem('nombre')) this.credenciales.nombre = localStorage.getItem('nombre');
    if (localStorage.getItem('usuario')) this.credenciales.usuario = localStorage.getItem('usuario');
    if (localStorage.getItem('accessToken')) this.credenciales.accessToken = localStorage.getItem('accessToken');
    if (localStorage.getItem('expiresAt')) this.credenciales.expiresIn = Number(localStorage.getItem('expiresAt'));
    if (localStorage.getItem('userId')) this.credenciales.userId = localStorage.getItem('userId');
    if (localStorage.getItem('foto')) this.credenciales.foto = localStorage.getItem('foto');
  }

  vigenereCipher(texto: string, key: string, mode: string = 'encrypt'): string {
    // Definir el alfabeto
    const alfabeto: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZzyxwvutsrqponmlkjihgfedcba0123456789$@!#%';

    // Crear una cadena para almacenar el resultado
    let result: string = '';

    // Inicializar un índice para recorrer la clave
    let keyIndex: number = 0;

    for (let i: number = 0; i < texto.length; i++) {
        const letra: string = texto[i];
        if (alfabeto.includes(letra)) {
            if (mode === 'encrypt') {
                // Cifrar: suma el índice del carácter del mensaje con el índice del carácter de la clave
                const encryptedLetraIndex: number = (alfabeto.indexOf(letra) + alfabeto.indexOf(key[keyIndex])) % alfabeto.length;
                const encryptedLetra: string = alfabeto.charAt(encryptedLetraIndex);
                result += encryptedLetra;
            } else {
                // Descifrar: resta el índice del carácter de la clave del índice del carácter del mensaje
                const decryptedLetraIndex: number = (alfabeto.indexOf(letra) - alfabeto.indexOf(key[keyIndex])) % alfabeto.length;
                const decryptedLetra: string = alfabeto.charAt((decryptedLetraIndex + alfabeto.length) % alfabeto.length);
                result += decryptedLetra;
            }

            // Avanzar al siguiente carácter de la clave (cíclicamente)
            keyIndex = (keyIndex + 1) % key.length;
        } else {
            // Si el carácter no está en el alfabeto, simplemente agrégalo al resultado sin cifrarlo/descifrarlo
            result += letra;
        }
    }

    return result;
  }

  deviceInfoFunction() {
    let Info = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();

    this.deviceInfo.os = `${Info["os"]}(${Info["os_version"]})`;
    this.deviceInfo.browser = `${Info["browser"]}(${Info["browser_version"]})`;
    this.deviceInfo.device = (isMobile ? "Movile" : (isTablet ? "Tablet" : "Desktop"));

  }
}
