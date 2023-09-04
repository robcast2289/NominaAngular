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

}
