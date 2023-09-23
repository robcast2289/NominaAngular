import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TablaBase } from '../../../services/base/tabla.model';
import { NgxSpinnerService } from 'ngx-spinner';

import { MenuService } from '../../../services/menu.service';
import { SucursalesService } from '../../../services/seguridad/sucursales.service';

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.css']
})
export class SucursalComponent extends TablaBase implements OnInit {

  constructor(private spinner: NgxSpinnerService,
    private sucursalService: SucursalesService,
    private router: Router,
    private menuService: MenuService) {
      super();
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

  eliminarEntidad(id: string) {
    this.entidadDelete = [];
    this.spinner.show();
    this.sucursalService.eliminar_sucursal(id)
    .subscribe(data => {
      this.spinner.hide();
      this.obtenerSucursales();
    });
  }

  preActualizarEntidad(entidad) {
    //this.proyService.selectProyecto = Object.assign(proyecto);
    this.limpiarForm();
    this.sucursalService.selectEntidad = {
      IdSucursal:entidad.IdSucursal,
      Nombre:entidad.Nombre,
      Direccion:entidad.Direccion,
      IdEmpresa:entidad.IdEmpresa
    };
  }

  limpiarForm() {
    this.obtenerEmpresas();
    this.sucursalService.selectEntidad = {
      IdSucursal:null,
      Nombre:null,
      Direccion:null,
      IdEmpresa:null
    };
  }

  obtenerEmpresas(){
    this.sucursalService.cargar_empresas()
    .subscribe(data => {
      this.sucursalService.empresas = data;
    });
  }

}
