import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';

import { MenuService } from '../../../services/menu.service';
import { UsuarioroleService } from '../../../services/seguridad/usuariorole.service';

@Component({
  selector: 'app-usuario-role',
  templateUrl: './usuario-role.component.html',
  styleUrls: ['./usuario-role.component.css']
})
export class UsuarioRoleComponent implements OnInit {
  id:number;
  usuario;

  entidad = [];
  entidadTable = [];
  buscar: string;
  page = 1;
  fieldSort: string;
  fieldSortDirection: string;
  entidadDelete = [];

  constructor(private _Activatedroute:ActivatedRoute,
    private spinner: NgxSpinnerService,
    private usuarioroleService: UsuarioroleService,
    private menuService: MenuService) { 
      this.menuService.titleActive = 'Configurar Usuario';
    }

  ngOnInit() {
    this._Activatedroute.params.subscribe(params => { 
      this.id = params['IdUsuario']; 
      this.obtenerUsuario(this.id);
      this.obtenerUsuarioRoles(this.id)
    });
  }

  obtenerUsuario(id){
    this.spinner.show();
    this.usuarioroleService.cargar_usuario(id)
    .subscribe(data => {
      this.spinner.hide();
      this.usuario = data;
    });
  }

  obtenerUsuarioRoles(id){
    this.spinner.show();
    this.usuarioroleService.cargar_usuarioroles(id)
    .subscribe(data => {
      this.spinner.hide();
      this.entidad = data;
      this.entidadTable = this.entidad;
    });
  }

  setEntidadDel(entidad: any) {
    this.entidadDelete = entidad;
  }

  eliminarEntidad(idusuario,idrole) {
    this.entidadDelete = [];
    this.spinner.show();
    this.usuarioroleService.eliminar_usuarioroles(idusuario,idrole)
    .subscribe(data => {
      this.spinner.hide();
      this.obtenerUsuarioRoles(idusuario);
    });
  }

  preActualizarEntidad(entidad) {
    //this.proyService.selectProyecto = Object.assign(proyecto);
    this.limpiarForm();
    this.usuarioroleService.selectEntidad = {
      IdUsuario: entidad.IdUsuario,
      IdRole: entidad.IdRole,
    };
  }

  limpiarForm() {
    this.obtenerRoles();
    this.usuarioroleService.selectEntidad = {
      IdUsuario: null,
    IdRole: null,
    };
  }

  obtenerRoles(){
    this.usuarioroleService.cargar_roles()
    .subscribe(data => {
      this.usuarioroleService.roles = data;
    });
  }

}
