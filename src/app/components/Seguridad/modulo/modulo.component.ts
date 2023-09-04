import { Component, OnInit } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';

import { MenuService } from '../../../services/menu.service';
import { ModuloService } from '../../../services/seguridad/modulo.service';

@Component({
  selector: 'app-modulo',
  templateUrl: './modulo.component.html',
  styleUrls: ['./modulo.component.css']
})
export class ModuloComponent implements OnInit {
  entidad = [];
  entidadTable = [];
  buscar: string;
  page = 1;
  fieldSort: string;
  fieldSortDirection: string;
  entidadDelete = [];

  constructor(private spinner: NgxSpinnerService,
              private moduloService: ModuloService,
              private menuService: MenuService) {
                this.menuService.titleActive = 'Modulos';
               }

  ngOnInit() {
    this.obtenerModulos();
  }

  obtenerModulos(){
    this.spinner.show();
    this.moduloService.cargar_modulos()
    .subscribe(data => {
      console.log(data);
      this.spinner.hide();
      this.entidad = data;
      this.entidadTable = this.entidad;
    });
  }

  setEtnidadDel(entidad: any) {
    this.entidadDelete = entidad;
  }

  eliminarEntidad(id: string) {
    this.entidadDelete = [];
    this.spinner.show();
    this.moduloService.eliminar_modulo(id)
    .subscribe(data => {
      this.spinner.hide();
      this.obtenerModulos();
    });
  }

}
