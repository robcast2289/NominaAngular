import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

import { InasistenciaService } from '../../../../services/nomina/inasistencia.service';

@Component({
  selector: 'app-cu-inasistencia',
  templateUrl: './cu-inasistencia.component.html',
  styleUrls: ['./cu-inasistencia.component.css']
})
export class CuInasistenciaComponent implements OnInit {

  constructor(
    public inasistenciaService:InasistenciaService
  ) { }

  ngOnInit() {
  }

  guardarEntidad(entidadForm: NgForm) {
    if (entidadForm.valid) {
      if (entidadForm.value.IdInasistencia == null) {
        // Nuevo
        this.inasistenciaService.insertar_inasistencia(entidadForm.value)        
        .subscribe(data => {
          if(this.inasistenciaService.errorMessage){
            this.myAlertTop();
          }
          else{
            location.reload();
          }
        });
      } else {
        // actualizar
        this.inasistenciaService.actualizar_inasistencia(entidadForm.value)        
        .subscribe(data => {
          if(this.inasistenciaService.errorMessage){
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
