import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';

import { MenuService } from '../../../services/menu.service';
import { SucursalesService } from '../../../services/seguridad/sucursales.service';

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.css']
})
export class SucursalComponent implements OnInit {
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
    private sucursalService: SucursalesService,
    private router: Router,
    private menuService: MenuService) {
      this.menuService.titleActive = 'Sucursales';
     }

  ngOnInit() {
    this.obtenerPermisos();
    this.obtenerSucursales();
  }

  obtenerPermisos(){
    this.menuService.permisosOpcion(this.sucursalService.authService.credenciales.userId,this.router.url)
    .subscribe(data=>{
      this.Permisos = data;
    });
  }

  obtenerSucursales(){
    this.spinner.show();
    this.sucursalService.cargar_sucursales()
    .subscribe(data => {
      this.spinner.hide();
      this.entidad = data;
      this.entidadTable = this.entidad;
    });
  }

  setEntidadDel(entidad: any) {
    this.entidadDelete = entidad;
  }

}
