import { Component, OnInit } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';

import { MenuService } from '../../../services/menu.service';
import { OpcionService } from '../../../services/seguridad/opcion.service';

@Component({
  selector: 'app-opcion',
  templateUrl: './opcion.component.html',
  styleUrls: ['./opcion.component.css']
})
export class OpcionComponent implements OnInit {
  entidad = [];
  entidadTable = [];
  buscar: string;
  page = 1;
  fieldSort: string;
  fieldSortDirection: string;
  entidadDelete = [];

  constructor(private spinner: NgxSpinnerService,
    private opcionService: OpcionService,
    private menuService: MenuService) {
      this.menuService.titleActive = 'Opciones';
     }

  ngOnInit() {
    this.obtenerOpciones();
  }

  obtenerOpciones(){
    this.spinner.show();
    this.opcionService.cargar_opciones()
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
    this.opcionService.eliminar_opciones(id)
    .subscribe(data => {
      this.spinner.hide();
      this.obtenerOpciones();
    });
  }

  preActualizarEntidad(entidad) {
    //this.proyService.selectProyecto = Object.assign(proyecto);
    this.limpiarForm();
    this.opcionService.selectEntidad = {
      IdOpcion: entidad.IdOpcion,
      IdMenu: entidad.IdMenu,
      Nombre: entidad.Nombre,
      OrdenMenu: entidad.OrdenMenu,
      Pagina: entidad.Pagina
    };
  }

  limpiarForm() {
    this.obtenerModulos();
    this.opcionService.selectEntidad = {
      IdOpcion: null,
      IdMenu: null,
      Nombre: '',
      OrdenMenu: '',
      Pagina: ''
    };
  }

  obtenerModulos(){
    this.opcionService.cargar_menus()
    .subscribe(data => {
      this.opcionService.menus = data;
    });
  }

}
