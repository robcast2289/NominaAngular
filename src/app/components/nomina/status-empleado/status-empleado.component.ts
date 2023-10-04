import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TablaBase } from '../../../services/base/tabla.model';
import { NgxSpinnerService } from 'ngx-spinner';

import { MenuService } from '../../../services/menu.service';
import { StatusempleadoService } from '../../../services/nomina/statusempleado.service';

@Component({
  selector: 'app-status-empleado',
  templateUrl: './status-empleado.component.html',
  styleUrls: ['./status-empleado.component.css']
})
export class StatusEmpleadoComponent extends TablaBase implements OnInit {

  constructor(private spinner: NgxSpinnerService,
    public statusempleadoService: StatusempleadoService,
    private router: Router,
    private menuService: MenuService) {
      super();
      this.menuService.titleActive = 'Status de Empleado';
     }

  ngOnInit() {
    this.obtenerPermisos();
    this.obtenerStatusEmpleado();
  }

  obtenerPermisos(){
    this.menuService.permisosOpcion(this.statusempleadoService.authService.credenciales.userId,this.router.url)
    .subscribe(data=>{
      this.Permisos = data;
    });
  }

  obtenerStatusEmpleado(){
    this.spinner.show();
    this.statusempleadoService.cargar_statusempleado()
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
    this.statusempleadoService.eliminar_statusempleado(id)
    .subscribe(data => {
      this.spinner.hide();
      if(this.statusempleadoService.errorMessage){
        this.myAlertTop();
      }
      else{
        this.obtenerStatusEmpleado();
      }
    });
  }

  preActualizarEntidad(entidad) {
    this.limpiarForm();
    this.statusempleadoService.selectEntidad = {
      IdStatusEmpleado: entidad.IdStatusEmpleado,
      Nombre: entidad.Nombre,
    };
  }

  limpiarForm() {
    this.statusempleadoService.selectEntidad = {
      IdStatusEmpleado: null,
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
