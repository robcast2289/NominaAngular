import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TablaBase } from '../../../services/base/tabla.model';
import { NgxSpinnerService } from 'ngx-spinner';

import { MenuService } from '../../../services/menu.service';
import { PeriodosService } from '../../../services/nomina/periodos.service';

@Component({
  selector: 'app-periodo',
  templateUrl: './periodo.component.html',
  styleUrls: ['./periodo.component.css']
})
export class PeriodoComponent extends TablaBase implements OnInit {

  constructor(private spinner: NgxSpinnerService,
    public periodosService: PeriodosService,
    private router: Router,
    private menuService: MenuService) {
      super();
      this.menuService.titleActive = 'Status de Empleado';
     }

  ngOnInit() {
    this.obtenerPermisos();
    this.obtenerPeriodoPlanilla();
  }

  obtenerPermisos(){
    this.menuService.permisosOpcion(this.periodosService.authService.credenciales.userId,this.router.url)
    .subscribe(data=>{
      this.Permisos = data;
    });
  }

  obtenerPeriodoPlanilla(){
    this.spinner.show();
    this.periodosService.cargar_periodoplanilla()
    .subscribe(data => {
      this.spinner.hide();
      this.entidad = data;
      this.entidad.forEach(element => {
        const date = new Date(element["FechaAcceso"]);
        element["FechaInicio"] = this.formatDate(new Date(element["FechaInicio"]+" 00:00:00"),false);
        element["FechaFin"] = this.formatDate(new Date(element["FechaFin"]+" 00:00:00"),false);
      });
      this.entidadTable = this.entidad;
    });
  }

  setEntidadDel(entidad: any) {
    this.entidadDelete = entidad;
  }

  eliminarEntidad(anio: number, mes: number) {
    this.entidadDelete = [];
    this.spinner.show();
    this.periodosService.eliminar_periodoplanilla(anio,mes)
    .subscribe(data => {
      this.spinner.hide();
      if(this.periodosService.errorMessage){
        this.myAlertTop();
      }
      else{
        this.obtenerPeriodoPlanilla();
      }
    });
  }

  /* preActualizarEntidad(entidad) {
    this.limpiarForm();
    this.periodosService.selectEntidad = {
      Anio: entidad.Anio,
      Mes: entidad.Mes,
      FechaInicio: entidad.FechaInicio,
      FechaFin: entidad.FechaFin
    };
  } */

  limpiarForm() {
    this.periodosService.selectEntidad = {
      Anio: 2023,
      Mes: null,
      Cantidad: 1,
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
