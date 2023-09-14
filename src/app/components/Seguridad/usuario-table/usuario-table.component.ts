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
      this.menuService.titleActive = 'Usuarios';
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
        IdUsuario:entidad.IdUsuario,
        UsuarioNuevo:entidad.UsuarioNuevo,
        Nombre:entidad.Nombre,
        Apellido:entidad.Apellido,
        FechaNacimiento:entidad.FechaNacimiento,
        IdStatusUsuario:entidad.IdStatusUsuario,
        IdGenero:entidad.IdGenero,
        IdSucursal:entidad.IdSucursal,
        TelefonoMovil:entidad.TelefonoMovil,
        CorreoElectronico:entidad.CorreoElectronico,
        Password:entidad.Password,
        Fotografia:entidad.Fotografia,
        UltimaFechaIngreso:entidad.UltimaFechaIngreso,
        IntentosDeAcceso:entidad.IntentosDeAcceso,
        UltimaFechaCambioPassword:entidad.UltimaFechaCambioPassword,
        RequiereCambiarPassword:entidad.RequiereCambiarPassword
      };
    }
  
    limpiarForm() {
      this.obtenerStatus();
      this.obtenerGeneros();
      this.obtenerSucursales();
      this.usuariotableService.selectEntidad = {
        IdUsuario:null,
        UsuarioNuevo:null,
        Nombre:null,
        Apellido:null,
        FechaNacimiento:null,
        IdStatusUsuario:null,
        IdGenero:null,
        IdSucursal:null,
        TelefonoMovil:null,
        CorreoElectronico:null,
        Password:null,
        Fotografia:null,
        UltimaFechaIngreso:null,
        IntentosDeAcceso:0,
        UltimaFechaCambioPassword:null,
        RequiereCambiarPassword:1
      };
    }

    obtenerStatus(){
      this.usuariotableService.cargar_status()
      .subscribe(data => {
        this.usuariotableService.status = data;
      });
    }

    obtenerGeneros(){
      this.usuariotableService.cargar_generos()
      .subscribe(data => {
        this.usuariotableService.generos = data;
      });
    }

    obtenerSucursales(){
      this.usuariotableService.cargar_sucursales()
      .subscribe(data => {
        this.usuariotableService.sucursales = data;
      });
    }

}
