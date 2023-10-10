import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TablaBase } from '../../../services/base/tabla.model';
import { NgxSpinnerService } from 'ngx-spinner';

import { MenuService } from '../../../services/menu.service';
import { PlanillacabeceraService } from '../../../services/nomina/planillacabecera.service';

@Component({
  selector: 'app-planilla',
  templateUrl: './planilla.component.html',
  styleUrls: ['./planilla.component.css']
})
export class PlanillaComponent extends TablaBase implements OnInit {

  constructor(private spinner: NgxSpinnerService,
    public planillacabeceraService: PlanillacabeceraService,
    private router: Router,
    private menuService: MenuService) {
      super();
      this.menuService.titleActive = 'Planillas';
     }

  ngOnInit() {
    this.obtenerPermisos();
    this.obtenerPlanillaCabecera();
  }

  obtenerPermisos(){
    this.menuService.permisosOpcion(this.planillacabeceraService.authService.credenciales.userId,this.router.url)
    .subscribe(data=>{
      this.Permisos = data;
    });
  }

  obtenerPlanillaCabecera(){
    this.spinner.show();
    this.planillacabeceraService.cargar_planillacabecera()
    .subscribe(data => {
      this.spinner.hide();
      this.entidad = data;
      this.entidad.forEach(element => {
        //console.log(element);
        element["FechaCalculada"] = this.formatDate(new Date(element["FechaCalculada"]),true);
        element["FechaProcesada"] = this.formatDate(new Date(element["FechaProcesada"]),true);
      });
      this.entidadTable = this.entidad;
    });
  }

  verDetalle(entidad){
    this.router.navigate(["/nomina/planilla/"+entidad.Anio+entidad.Mes])
  }

  /* preActualizarEntidad(entidad) {
    this.router.navigate(["/nomina/empleados/"+entidad.IdEmpleado])
  }

  eliminarEntidad(id: string) {
    this.entidadDelete = [];
    this.spinner.show();
    this.planillacabeceraService.eliminar_empleado(id)
    .subscribe(data => {
      this.spinner.hide();
      if(this.planillacabeceraService.errorMessage){
        this.myAlertTop();
      }
      else{
        this.obtenerEmpleado();
      }
    });
  } */


  myAlertTop(){
    $(".myAlert-top").show();
    setTimeout(function(){
      $(".myAlert-top").hide();   
      this.opcionService.errorMessage = "";    
    }, 8000);    
  }

}
