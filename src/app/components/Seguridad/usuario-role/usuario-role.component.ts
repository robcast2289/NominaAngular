import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';

import { MenuService } from '../../../services/menu.service';
import { RolesopcionService } from '../../../services/seguridad/rolesopcion.service';

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
    private rolesopcionService: RolesopcionService,
    private menuService: MenuService) { 
      this.menuService.titleActive = 'Configurar Usuario';
    }

  ngOnInit() {
    this._Activatedroute.params.subscribe(params => { 
      this.id = params['IdUsuario']; 
      this.obtenerRole(this.id);
      this.obtenerRolesOpciones(this.id)
    });
  }

  obtenerRole(id){
    this.spinner.show();
    this.rolesopcionService.cargar_role(id)
    .subscribe(data => {
      this.spinner.hide();
      this.usuario = data;
    });
  }

  obtenerRolesOpciones(id){
    this.spinner.show();
    this.rolesopcionService.cargar_roleopciones(id)
    .subscribe(data => {
      this.spinner.hide();
      this.entidad = data;
      this.entidadTable = this.entidad;
    });
  }

  setEntidadDel(entidad: any) {
    this.entidadDelete = entidad;
  }

  eliminarEntidad(idrole,idopcion) {
    this.entidadDelete = [];
    this.spinner.show();
    this.rolesopcionService.eliminar_roleopciones(idrole,idopcion)
    .subscribe(data => {
      this.spinner.hide();
      this.obtenerRolesOpciones(idrole);
    });
  }

  preActualizarEntidad(entidad) {
    //this.proyService.selectProyecto = Object.assign(proyecto);
    this.limpiarForm();
    this.rolesopcionService.selectEntidad = {
      IdRole: entidad.IdRole,
      IdOpcion: entidad.IdOpcion,
      Alta: entidad.Alta,
      Baja: entidad.Baja,
      Cambio: entidad.Cambio,
      Imprimir: entidad.Imprimir,
      Exportar: entidad.Exportar,
    };
  }

  limpiarForm() {
    this.obtenerOpciones();
    this.rolesopcionService.selectEntidad = {
      IdRole: null,
      IdOpcion: null,
      Alta: null,
      Baja: null,
      Cambio: null,
      Imprimir: null,
      Exportar: null,
    };
  }

  obtenerOpciones(){
    this.rolesopcionService.cargar_opciones()
    .subscribe(data => {
      this.rolesopcionService.opciones = data;
    });
  }

}
