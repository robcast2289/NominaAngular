import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URL_SERVICES } from '../../config/urlserver.config';
import { AuthService } from '../auth.service';
import { JsonPipe } from '@angular/common';
import { LoginComponent } from '../../components/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AccesoService {
  basepath = URL_SERVICES;

  selectAcceso = {
    id: null,
    nombre: '',
    id_acceso_padre: '',
    ruta: ''
  };

  accesosPadre = [];

  constructor(private http: HttpClient, private authService: AuthService) { }

  cargar_accesos() {
    const url = `${this.basepath}administracion/accesos/${this.authService.credenciales.accessToken}`;

    return this.http.get(url);
  }

  cargar_accesos_padre() {
    const url = `${this.basepath}administracion/accesos/accesos_padre/${this.authService.credenciales.accessToken}`;

    return this.http.get(url);
  }

  eliminar_acceso(id) {
    const url = `${this.basepath}administracion/accesos/borrar_acceso/${this.authService.credenciales.accessToken}/${id}`;

    return this.http.delete(url);
  }

  insertar_acceso(Form) {
    const url = `${this.basepath}administracion/accesos/crear_acceso/${this.authService.credenciales.accessToken}`;

    const params = {
      datosacceso: Form
    };

    return this.http.post(url, params);
  }

  actualizar_acceso(accesoForm) {
    const id = accesoForm.id;
    const url = `${this.basepath}administracion/accesos/actualiza_acceso/${this.authService.credenciales.accessToken}/${id}`;

    const params = {
      datos: accesoForm
    };

    return this.http.post(url, params);
  }
}
