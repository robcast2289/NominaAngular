import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

import { EmpleadoService } from '../../../../services/nomina/empleado.service';

@Component({
  selector: 'app-c-empleado',
  templateUrl: './c-empleado.component.html',
  styleUrls: ['./c-empleado.component.css']
})
export class CEmpleadoComponent implements OnInit {

  constructor(
    public empleadoService:EmpleadoService
  ) { }

  ngOnInit() {
  }

  guardarEntidad(entidadForm: NgForm) {
    if (entidadForm.valid) {
        // Nuevo
        this.empleadoService.insertar_empleado(entidadForm.value)        
        .subscribe(data => {
          if(this.empleadoService.errorMessage){
            this.myAlertTop();
          }
          else{
            location.reload();
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
