import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TablaBase } from '../../../services/base/tabla.model';
import { NgxSpinnerService } from 'ngx-spinner';

import { MenuService } from '../../../services/menu.service';
import { EstadocivilService } from '../../../services/rrhh/estadocivil.service';

@Component({
  selector: 'app-estado-civil',
  templateUrl: './estado-civil.component.html',
  styleUrls: ['./estado-civil.component.css']
})
export class EstadoCivilComponent extends TablaBase implements OnInit {

  constructor(private spinner: NgxSpinnerService,
    public estadocivilService: EstadocivilService,
    private router: Router,
    private menuService: MenuService) {
      super();
      this.menuService.titleActive = 'Estado Civil';
     }

  ngOnInit() {
    this.obtenerPermisos();
    this.obtenerEstadoCivil();
  }

  obtenerPermisos(){
    this.menuService.permisosOpcion(this.estadocivilService.authService.credenciales.userId,this.router.url)
    .subscribe(data=>{
      this.Permisos = data;
    });
  }

  obtenerEstadoCivil(){
    this.spinner.show();
    this.estadocivilService.cargar_estadocivil()
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
    this.estadocivilService.eliminar_estadocivil(id)
    .subscribe(data => {
      this.spinner.hide();
      if(this.estadocivilService.errorMessage){
        this.myAlertTop();
      }
      else{
        this.obtenerEstadoCivil();
      }
    });
  }

  preActualizarEntidad(entidad) {
    this.limpiarForm();
    this.estadocivilService.selectEntidad = {
      IdEstadoCivil: entidad.IdEstadoCivil,
      Nombre: entidad.Nombre,
    };
  }

  limpiarForm() {
    this.estadocivilService.selectEntidad = {
      IdEstadoCivil: null,
      Nombre: null,
    };
  }

  myAlertTop(){
    $(".myAlert-top").show();
    setTimeout(function(){
      $(".myAlert-top").hide();   
      this.opcionService.errorMessage = "";    
    }, 8000);    
  }

}
