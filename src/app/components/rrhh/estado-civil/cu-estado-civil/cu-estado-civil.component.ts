import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

import { EstadocivilService } from '../../../../services/rrhh/estadocivil.service';

@Component({
  selector: 'app-cu-estado-civil',
  templateUrl: './cu-estado-civil.component.html',
  styleUrls: ['./cu-estado-civil.component.css']
})
export class CuEstadoCivilComponent implements OnInit {

  constructor(
    public estadocivilService:EstadocivilService
  ) { }

  ngOnInit() {
  }

  guardarEntidad(entidadForm: NgForm) {
    if (entidadForm.valid) {
      if (entidadForm.value.IdEstadoCivil == null) {
        // Nuevo
        this.estadocivilService.insertar_estadocivil(entidadForm.value)        
        .subscribe(data => {
          if(this.estadocivilService.errorMessage){
            this.myAlertTop();
          }
          else{
            location.reload();
          }
        });
      } else {
        // actualizar
        this.estadocivilService.actualizar_estadocivil(entidadForm.value)        
        .subscribe(data => {
          if(this.estadocivilService.errorMessage){
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
