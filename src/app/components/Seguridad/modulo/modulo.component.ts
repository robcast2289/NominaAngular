import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  Permisos:any = {
    Alta:0,
    Baja:0,
    Cambio:0
  }

  constructor(private spinner: NgxSpinnerService,
              private moduloService: ModuloService,
              private router: Router,
              private menuService: MenuService) {
                this.menuService.titleActive = 'Modulos';
               }

  ngOnInit() {
    this.obtenerPermisos();
    this.obtenerModulos();
  }

  obtenerPermisos(){
    this.menuService.permisosOpcion(this.moduloService.authService.credenciales.userId,this.router.url)
    .subscribe(data=>{
      this.Permisos = data;
    });
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

  setEntidadDel(entidad: any) {
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

  preActualizarEntidad(entidad) {
    //this.proyService.selectProyecto = Object.assign(proyecto);
    console.log(entidad);
    this.moduloService.selectEntidad = {
      IdModulo: entidad.IdModulo,
      Nombre: entidad.Nombre,
      OrdenMenu: entidad.OrdenMenu
    };
  }

  limpiarForm() {
    this.moduloService.selectEntidad = {
      IdModulo: null,
      Nombre: '',
      OrdenMenu: ''
    };
  }


  // Funcion para buscar
  funcSearch(ev) {
    const arrayBuscar = ev.toString().split(' ');

    if (ev.length > 0) {
      this.entidadTable = this.entidad.filter(proyecto => {
        let respuesta: boolean;
        for (const element in proyecto) {
          if (proyecto[element] != null) {
            arrayBuscar.forEach(palabra => {
              if (palabra !== '') {
                if (proyecto[element].toString().toLowerCase().indexOf(palabra.toString().toLowerCase()) !== -1) {
                  respuesta = true;
                }
              }
            });
          }
        }
        return respuesta;
      });
    } else {
      this.entidadTable = this.entidad;
    }
  }

}
