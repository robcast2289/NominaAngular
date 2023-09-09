import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';

import { MenuService } from '../../../services/menu.service';
import { UsuariotableService } from '../../../services/seguridad/usuariotable.service';

@Component({
  selector: 'app-usuario-table',
  templateUrl: './usuario-table.component.html',
  styleUrls: ['./usuario-table.component.css']
})
export class UsuarioTableComponent implements OnInit {
  entidad = [];
  entidadTable = [];
  buscar: string;
  page = 1;
  fieldSort: string;
  fieldSortDirection: string;
  entidadDelete = [];

  constructor(private spinner: NgxSpinnerService,
    private usuariotableService: UsuariotableService,
    private menuService: MenuService) {
      this.menuService.titleActive = 'Usuario';
     }

     ngOnInit() {
      this.obtenerUsuario()
    }
  
    obtenerUsuario(){
      this.spinner.show();
      this.usuariotableService.cargar_usuarios()
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
      this.usuariotableService.eliminar_usuarios(id)
      .subscribe(data => {
        this.spinner.hide();
        this.obtenerUsuario();
      });
    }
  
    preActualizarEntidad(entidad) {
      //this.proyService.selectProyecto = Object.assign(proyecto);
      this.limpiarForm();
      this.usuariotableService.selectEntidad = {
        IdRole: entidad.IdRole,
        Nombre: entidad.Nombre
      };
    }
  
    limpiarForm() {
      this.usuariotableService.selectEntidad = {
        IdRole: null,
        Nombre: ''
      };
    }

}
