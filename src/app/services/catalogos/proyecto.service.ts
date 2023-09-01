import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URL_SERVICES } from '../../config/urlserver.config';
import { AuthService } from '../auth.service';
import { JsonPipe } from '@angular/common';
import { LoginComponent } from '../../components/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  basepath = URL_SERVICES;

  selectProyecto = {
    idproyecto: null,
    nombre: '',
    nombreedificio: '',
    entidadvendedora: '',
    direccion: '',
    area: '',
    finca: '',
    folio: '',
    libro: '',
    fechavencimiento: '',
    dialimite: '',
    porcentajemora: '',
    valortipocambio: '',
    nombre_rep: '',
    fechanac_rep: '',
    estadocivil_rep: '',
    dpi_rep: '',
    descripcion_rep: '',
    fechaactanotarial: '',
    notario: '',
    registro: '',
    folio_reg: '',
    libro_reg: '',
    fecha_reg: '',
    textocorreo: ''
  };

  constructor(private http: HttpClient, private authService: AuthService) { }

  cargar_proyectos() {
    const url = `${this.basepath}catalogos/proyectos/${this.authService.credenciales.accessToken}`;

    return this.http.get(url);
  }

  eliminar_proyecto(idproyecto) {
    const url = `${this.basepath}catalogos/proyectos/borrar/${this.authService.credenciales.accessToken}/${idproyecto}`;

    return this.http.delete(url);
  }

  insertar_proyecto(proyectoForm) {
    const url = `${this.basepath}catalogos/proyectos/crear_proyecto/${this.authService.credenciales.accessToken}`;

    const params = {
      datosproyecto: proyectoForm
    };

    return this.http.post(url, params);
  }

  actualizar_proyecto(proyectoForm) {
    const idproyecto = proyectoForm.idproyecto;
    const url = `${this.basepath}catalogos/proyectos/actualiza_proyecto/${this.authService.credenciales.accessToken}/${idproyecto}`;

    const params = {
      datosproyecto: proyectoForm
    };

    return this.http.post(url, params);
  }
}
