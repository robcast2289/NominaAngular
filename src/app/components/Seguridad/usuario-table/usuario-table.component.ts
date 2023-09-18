import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

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
  Permisos:any = {
    Alta:0,
    Baja:0,
    Cambio:0
  }

  constructor(private spinner: NgxSpinnerService,
    private usuariotableService: UsuariotableService,
    private router: Router,
    private menuService: MenuService) {
      this.menuService.titleActive = 'Usuarios';
     }

     ngOnInit() {
      this.obtenerPermisos();
      this.obtenerUsuario()
    }

    obtenerPermisos(){
      this.menuService.permisosOpcion(this.usuariotableService.authService.credenciales.userId,this.router.url)
      .subscribe(data=>{
        this.Permisos = data;
      });
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
        Password:this.usuariotableService.authService.vigenereCipher(entidad.Password,this.usuariotableService.authService.key,"decrypt"),
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
      this.obtenerEmpresa();
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

    myAlertTop(){
      $(".myAlert-top").show();
      setTimeout(function(){
        $(".myAlert-top").hide();   
        this.opcionService.errorMessage = "";    
      }, 8000);    
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

    obtenerEmpresa(){
      this.usuariotableService.cargar_empresa()
      .subscribe(data => {
        this.usuariotableService.empresa = data;
      });
    }

}
