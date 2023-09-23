import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TablaBase } from '../../../services/base/tabla.model';
import { NgxSpinnerService } from 'ngx-spinner';

import { MenuService } from '../../../services/menu.service';
import { EstadousuarioService } from '../../../services/seguridad/estadousuario.service';

@Component({
  selector: 'app-status-usuario',
  templateUrl: './status-usuario.component.html',
  styleUrls: ['./status-usuario.component.css']
})
export class StatusUsuarioComponent extends TablaBase implements OnInit {

  constructor(private spinner: NgxSpinnerService,
    private statusUsuarioService: EstadousuarioService,
    private router: Router,
    private menuService: MenuService) {
      super();
      this.menuService.titleActive = 'Estados del Usurio';
     }

  ngOnInit() {
    this.obtenerPermisos();
    this.obtenerStatusUsuario();
  }

  obtenerPermisos(){
    this.menuService.permisosOpcion(this.statusUsuarioService.authService.credenciales.userId,this.router.url)
    .subscribe(data=>{
      this.Permisos = data;
    });
  }

  obtenerStatusUsuario(){
    this.spinner.show();
    this.statusUsuarioService.cargar_status_usuario()
    .subscribe(data => {
      this.spinner.hide();
      this.entidad = data;
      this.entidadTable = this.entidad;
    });
  }

  setEntidadDel(entidad: any) {
    this.entidadDelete = entidad;
  }

  eliminarEntidad(id: string) {
    this.entidadDelete = [];
    this.spinner.show();
    this.statusUsuarioService.eliminar_status_usuario(id)
    .subscribe(data => {
      this.spinner.hide();
      this.obtenerStatusUsuario();
    });
  }

  preActualizarEntidad(entidad) {
    this.limpiarForm();
    this.statusUsuarioService.selectEntidad = {
      IdStatusUsuario: entidad.IdStatusUsuario,
      Nombre: entidad.Nombre
    };
  }

  limpiarForm() {
    this.statusUsuarioService.selectEntidad = {
      IdStatusUsuario: null,
      Nombre: ''
    };
  }

}
