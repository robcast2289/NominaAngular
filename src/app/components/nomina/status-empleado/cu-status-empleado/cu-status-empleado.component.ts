import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

import { StatusempleadoService } from '../../../../services/nomina/statusempleado.service';

@Component({
  selector: 'app-cu-status-empleado',
  templateUrl: './cu-status-empleado.component.html',
  styleUrls: ['./cu-status-empleado.component.css']
})
export class CuStatusEmpleadoComponent implements OnInit {

  constructor(
    public statusempleadoService:StatusempleadoService
  ) { }

  ngOnInit() {
  }

  guardarEntidad(entidadForm: NgForm) {
    if (entidadForm.valid) {
      if (entidadForm.value.IdStatusEmpleado == null) {
        // Nuevo
        this.statusempleadoService.insertar_statusempleado(entidadForm.value)        
        .subscribe(data => {
          if(this.statusempleadoService.errorMessage){
            this.myAlertTop();
          }
          else{
            location.reload();
          }
        });
      } else {
        // actualizar
        this.statusempleadoService.actualizar_statusempleado(entidadForm.value)        
        .subscribe(data => {
          if(this.statusempleadoService.errorMessage){
            this.myAlertTop();
          }
          else{
            location.reload();
          }
        });
      }
    }
  }  

  myAlertTop(){
    $(".myAlert-top").show();
    setTimeout(function(){
      $(".myAlert-top").hide();   
      this.opcionService.errorMessage = "";    
    }, 8000);    
  }

}
