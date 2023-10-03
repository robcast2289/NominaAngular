import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

import { PuestoService } from '../../../../services/rrhh/puesto.service';

@Component({
  selector: 'app-cu-puesto',
  templateUrl: './cu-puesto.component.html',
  styleUrls: ['./cu-puesto.component.css']
})
export class CuPuestoComponent implements OnInit {

  constructor(
    public puestoService:PuestoService
  ) { }

  ngOnInit() {
  }

  guardarEntidad(entidadForm: NgForm) {
    if (entidadForm.valid) {
      if (entidadForm.value.IdPuesto == null) {
        // Nuevo
        this.puestoService.insertar_puesto(entidadForm.value)        
        .subscribe(data => {
          if(this.puestoService.errorMessage){
            this.myAlertTop();
          }
          else{
            location.reload();
          }
        });
      } else {
        // actualizar
        this.puestoService.actualizar_puesto(entidadForm.value)        
        .subscribe(data => {
          if(this.puestoService.errorMessage){
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
