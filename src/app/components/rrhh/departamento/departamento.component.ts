import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TablaBase } from '../../../services/base/tabla.model';
import { NgxSpinnerService } from 'ngx-spinner';

import { MenuService } from '../../../services/menu.service';
import { DepartamentoService } from '../../../services/rrhh/departamento.service';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css']
})
export class DepartamentoComponent extends TablaBase implements OnInit {

  constructor(private spinner: NgxSpinnerService,
    public departamentoService: DepartamentoService,
    private router: Router,
    private menuService: MenuService) {
      super();
      this.menuService.titleActive = 'Departamentos';
     }

  ngOnInit() {
    this.obtenerPermisos();
    this.obtenerDepartamento();
  }

  obtenerPermisos(){
    this.menuService.permisosOpcion(this.departamentoService.authService.credenciales.userId,this.router.url)
    .subscribe(data=>{
      this.Permisos = data;
    });
  }

  obtenerDepartamento(){
    this.spinner.show();
    this.departamentoService.cargar_departamento()
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
    this.departamentoService.eliminar_departamento(id)
    .subscribe(data => {
      this.spinner.hide();
      if(this.departamentoService.errorMessage){
        this.myAlertTop();
      }
      this.obtenerDepartamento();
    });
  }

  preActualizarEntidad(entidad) {
    //this.proyService.selectProyecto = Object.assign(proyecto);
    this.limpiarForm();
    this.departamentoService.selectEntidad = {
      IdDepartamento: entidad.IdDepartamento,
      Nombre: entidad.Nombre,
      IdEmpresa: entidad.IdEmpresa,
    };
  }

  limpiarForm() {
    this.obtenerEmpresa();
    this.departamentoService.selectEntidad = {
      IdDepartamento: null,
      Nombre: null,
      IdEmpresa: null,
    };
  }

  obtenerEmpresa(){
    this.departamentoService.cargar_empresas()
    .subscribe(data => {
      this.departamentoService.empresas = data;
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
