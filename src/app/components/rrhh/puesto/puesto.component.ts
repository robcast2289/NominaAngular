import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TablaBase } from '../../../services/base/tabla.model';
import { NgxSpinnerService } from 'ngx-spinner';

import { MenuService } from '../../../services/menu.service';
import { PuestoService } from '../../../services/rrhh/puesto.service';

@Component({
  selector: 'app-puesto',
  templateUrl: './puesto.component.html',
  styleUrls: ['./puesto.component.css']
})
export class PuestoComponent extends TablaBase implements OnInit {

  constructor(private spinner: NgxSpinnerService,
    public puestoService: PuestoService,
    private router: Router,
    private menuService: MenuService) {
      super();
      this.menuService.titleActive = 'Puestos';
     }

  ngOnInit() {
    this.obtenerPermisos();
    this.obtenerPuesto();
  }

  obtenerPermisos(){
    this.menuService.permisosOpcion(this.puestoService.authService.credenciales.userId,this.router.url)
    .subscribe(data=>{
      this.Permisos = data;
    });
  }

  obtenerPuesto(){
    this.spinner.show();
    this.puestoService.cargar_puesto()
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
    this.puestoService.eliminar_puesto(id)
    .subscribe(data => {
      this.spinner.hide();
      if(this.puestoService.errorMessage){
        this.myAlertTop();
      }
      else{
        this.obtenerPuesto();
      }
    });
  }

  preActualizarEntidad(entidad) {
    //this.proyService.selectProyecto = Object.assign(proyecto);
    this.limpiarForm();
    this.puestoService.selectEntidad = {
      IdPuesto: entidad.IdPuesto,
      Nombre: entidad.Nombre,
      IdDepartamento: entidad.IdDepartamento,
    };
  }

  limpiarForm() {
    this.obtenerDepartamento();
    this.puestoService.selectEntidad = {
      IdPuesto: null,
      Nombre: null,
      IdDepartamento: null,
    };
  }

  obtenerDepartamento(){
    this.puestoService.cargar_departamentos()
    .subscribe(data => {
      this.puestoService.departamentos = data;
    });
  }

  myAlertTop(){
    $(".myAlert-top").show();
    setTimeout(function(){
      $(".myAlert-top").hide();   
      this.opcionService.errorMessage = "";    
    }, 8000);    
  }

}
