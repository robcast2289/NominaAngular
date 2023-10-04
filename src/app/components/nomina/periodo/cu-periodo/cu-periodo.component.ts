import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

import { PeriodosService } from '../../../../services/nomina/periodos.service';

@Component({
  selector: 'app-cu-periodo',
  templateUrl: './cu-periodo.component.html',
  styleUrls: ['./cu-periodo.component.css']
})
export class CuPeriodoComponent implements OnInit {

  constructor(
    public periodoService:PeriodosService
  ) { }

  ngOnInit() {
  }

  guardarEntidad(entidadForm: NgForm) {
    if (entidadForm.valid) {
      //if (entidadForm.value.IdStatusEmpleado == null) {
        // Nuevo
        this.periodoService.insertar_periodoplanilla(entidadForm.value)        
        .subscribe(data => {
          if(this.periodoService.errorMessage){
            this.myAlertTop();
          }
          else{
            location.reload();
          }
        });
      /* } else {
        // actualizar
        this.periodoService.actualizar_statusempleado(entidadForm.value)        
        .subscribe(data => {
          if(this.periodoService.errorMessage){
            this.myAlertTop();
          }
          else{
            location.reload();
          }
        });
      } */
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
