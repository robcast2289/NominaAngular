import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TablaBase } from '../../../services/base/tabla.model';
import { NgxSpinnerService } from 'ngx-spinner';

import { MenuService } from '../../../services/menu.service';
import { RolesopcionService } from '../../../services/seguridad/rolesopcion.service';

@Component({
  selector: 'app-roles-opcion',
  templateUrl: './roles-opcion.component.html',
  styleUrls: ['./roles-opcion.component.css']
})
export class RolesOpcionComponent extends TablaBase implements OnInit {
  id:number;
  role;

  constructor(private _Activatedroute:ActivatedRoute,
    private spinner: NgxSpinnerService,
    private rolesopcionService: RolesopcionService,
    private menuService: MenuService) { 
      super();
      this.menuService.titleActive = 'Configurar opciones por role';
    }

  ngOnInit() {
    this._Activatedroute.params.subscribe(params => { 
      this.id = params['IdRole']; 
      this.obtenerRole(this.id);
      this.obtenerRolesOpciones(this.id)
    });
  }

  obtenerRole(id){
    this.spinner.show();
    this.rolesopcionService.cargar_role(id)
    .subscribe(data => {
      this.spinner.hide();
      this.role = data;
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
