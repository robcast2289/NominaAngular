import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

import { PlanillacabeceraService } from '../../../../services/nomina/planillacabecera.service';

@Component({
  selector: 'app-cu-planilla',
  templateUrl: './cu-planilla.component.html',
  styleUrls: ['./cu-planilla.component.css']
})
export class CuPlanillaComponent implements OnInit {

  constructor(
    public planillacabeceraService:PlanillacabeceraService
  ) { }

  ngOnInit() {
  }

  guardarEntidad(entidadForm: NgForm) {
    if (entidadForm.valid) {
        // Nuevo
        this.planillacabeceraService.insertar_planillacabecera(entidadForm.value)        
        .subscribe(data => {
          if(this.planillacabeceraService.errorMessage){
            this.myAlertTop();
          }
          else{
            //location.reload();
          }
        });      
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
