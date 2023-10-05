import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TablaBase } from '../../../services/base/tabla.model';
import { NgxSpinnerService } from 'ngx-spinner';

import { MenuService } from '../../../services/menu.service';
import { InasistenciaService } from '../../../services/nomina/inasistencia.service';

@Component({
  selector: 'app-inasistencia',
  templateUrl: './inasistencia.component.html',
  styleUrls: ['./inasistencia.component.css']
})
export class InasistenciaComponent extends TablaBase implements OnInit {

  constructor(private spinner: NgxSpinnerService,
    public inasistenciaService: InasistenciaService,
    private router: Router,
    private menuService: MenuService) {
      super();
      this.menuService.titleActive = 'Registro de Inasistencias';
     }

  ngOnInit() {
    this.obtenerPermisos();
    this.obtenerInasistencia();
  }

  obtenerPermisos(){
    this.menuService.permisosOpcion(this.inasistenciaService.authService.credenciales.userId,this.router.url)
    .subscribe(data=>{
      this.Permisos = data;
    });
  }

  obtenerInasistencia(){
    this.spinner.show();
    this.inasistenciaService.cargar_inasistencia()
    .subscribe(data => {
      this.spinner.hide();
      this.entidad = data;
      this.entidad.forEach(element => {
        element["FechaInicial"] = this.formatDate(new Date(element["FechaInicial"]),false);
        element["FechaFinal"] = this.formatDate(new Date(element["FechaFinal"]),false);
      });
      this.entidadTable = this.entidad;
    });
  }

  setEntidadDel(entidad: any) {
    this.entidadDelete = entidad;
  }

  eliminarEntidad(id: string) {
    this.entidadDelete = [];
    this.spinner.show();
    this.inasistenciaService.eliminar_inasistencia(id)
    .subscribe(data => {
      this.spinner.hide();
      if(this.inasistenciaService.errorMessage){
        this.myAlertTop();
      }
      else{
        this.obtenerInasistencia();
      }
    });
  }

  preActualizarEntidad(entidad) {
    this.limpiarForm();
    this.inasistenciaService.selectEntidad = {
      IdInasistencia: entidad.IdInasistencia,
      IdEmpleado: entidad.IdEmpleado,
      FechaInicial: entidad.FechaInicial.replace("T00:00:00",""),
      FechaFinal: entidad.FechaFinal.replace("T00:00:00",""),
      MotivoInasistencia: entidad.MotivoInasistencia,
    };
    console.log(this.inasistenciaService.selectEntidad);
  }

  limpiarForm() {
    this.obtenerEmpleados();
    this.inasistenciaService.selectEntidad = {
      IdInasistencia: null,
      IdEmpleado: null,
      FechaInicial: null,
      FechaFinal: null,
      MotivoInasistencia: null,
    };
  }

  obtenerEmpleados(){
    this.inasistenciaService.cargar_empleados()
    .subscribe(data => {
      this.inasistenciaService.empleados = data;
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
