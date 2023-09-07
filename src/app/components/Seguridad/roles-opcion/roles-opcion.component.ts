import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';

import { MenuService } from '../../../services/menu.service';
import { RolesopcionService } from '../../../services/seguridad/rolesopcion.service';

@Component({
  selector: 'app-roles-opcion',
  templateUrl: './roles-opcion.component.html',
  styleUrls: ['./roles-opcion.component.css']
})
export class RolesOpcionComponent implements OnInit {
  id:number;
  role;

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
      console.log(this.role)
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

}
