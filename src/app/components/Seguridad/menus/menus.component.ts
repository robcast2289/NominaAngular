import { Component, OnInit } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';

import { MenuService } from '../../../services/menu.service';
import { MenuTableService} from '../../../services/seguridad/menutable.service';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {
  entidad = [];
  entidadTable = [];
  buscar: string;
  page = 1;
  fieldSort: string;
  fieldSortDirection: string;
  entidadDelete = [];

  constructor(private spinner: NgxSpinnerService,
    private menuTableService: MenuTableService,
    private menuService: MenuService) {
      this.menuService.titleActive = 'Menus';
     }

  ngOnInit() {
    this.obtenerMenus();
  }
  
    obtenerMenus(){
      this.spinner.show();
      this.menuTableService.cargar_menus()
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
      this.menuTableService.eliminar_menus(id)
      .subscribe(data => {
        this.spinner.hide();
        this.obtenerMenus();
      });
    }

    preActualizarEntidad(entidad) {
      //this.proyService.selectProyecto = Object.assign(proyecto);
      this.limpiarForm();
      this.menuTableService.selectEntidad = {
        IdMenu: entidad.IdMenu,
        IdModulo: entidad.IdModulo,
        Nombre: entidad.Nombre,
        OrdenMenu: entidad.OrdenMenu
      };
    }
  
    limpiarForm() {
      this.obtenerModulos();
      this.menuTableService.selectEntidad = {
        IdMenu: null,
        IdModulo: null,
        Nombre: '',
        OrdenMenu: ''
      };
    }

    obtenerModulos(){
      this.menuTableService.cargar_modulos()
      .subscribe(data => {
        this.menuTableService.modulos = data;
      });
    }

}
