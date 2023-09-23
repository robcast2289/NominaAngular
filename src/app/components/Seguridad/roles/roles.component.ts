import { Component, OnInit } from '@angular/core';
import { TablaBase } from '../../../services/base/tabla.model';
import { NgxSpinnerService } from 'ngx-spinner';

import { MenuService } from '../../../services/menu.service';
import { RolesService } from '../../../services/seguridad/roles.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent extends TablaBase implements OnInit {
  
  constructor(private spinner: NgxSpinnerService,
    private rolesService: RolesService,
    private menuService: MenuService) {
      super();
      this.menuService.titleActive = 'Roles';
     }

  ngOnInit() {
    this.obtenerRoles()
  }

  obtenerRoles(){
    this.spinner.show();
    this.rolesService.cargar_roles()
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
    this.rolesService.eliminar_roles(id)
    .subscribe(data => {
      this.spinner.hide();
      this.obtenerRoles();
    });
  }

  preActualizarEntidad(entidad) {
    //this.proyService.selectProyecto = Object.assign(proyecto);
    this.limpiarForm();
    this.rolesService.selectEntidad = {
      IdRole: entidad.IdRole,
      Nombre: entidad.Nombre
    };
  }

  limpiarForm() {
    this.rolesService.selectEntidad = {
      IdRole: null,
      Nombre: ''
    };
  }

}
