import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

import { TipodocumentoService } from '../../../../services/rrhh/tipodocumento.service';

@Component({
  selector: 'app-cu-tipo-documento',
  templateUrl: './cu-tipo-documento.component.html',
  styleUrls: ['./cu-tipo-documento.component.css']
})
export class CuTipoDocumentoComponent implements OnInit {

  constructor(
    public tipodocumentoService:TipodocumentoService
  ) { }

  ngOnInit() {
  }

  guardarEntidad(entidadForm: NgForm) {
    if (entidadForm.valid) {
      if (entidadForm.value.IdTipoDocumento == null) {
        // Nuevo
        this.tipodocumentoService.insertar_tipodocumento(entidadForm.value)        
        .subscribe(data => {
          if(this.tipodocumentoService.errorMessage){
            this.myAlertTop();
          }
          else{
            location.reload();
          }
        });
      } else {
        // actualizar
        this.tipodocumentoService.actualizar_tipodocumento(entidadForm.value)        
        .subscribe(data => {
          if(this.tipodocumentoService.errorMessage){
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
