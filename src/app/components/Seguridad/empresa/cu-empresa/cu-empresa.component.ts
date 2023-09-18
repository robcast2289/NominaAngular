import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

import { EmpresasService } from '../../../../services/seguridad/empresas.service';

@Component({
  selector: 'app-cu-empresa',
  templateUrl: './cu-empresa.component.html',
  styleUrls: ['./cu-empresa.component.css']
})
export class CuEmpresaComponent implements OnInit {

  constructor(
    private empresaService:EmpresasService
  ) { }

  ngOnInit() {
  }

  guardarEntidad(entidadForm: NgForm) {
    if (entidadForm.valid) {
      if (entidadForm.value.IdEmpresa == null) {
        // Nuevo
        this.empresaService.insertar_empresa(entidadForm.value)        
        .subscribe(data => {
          location.reload();
        });
      } else {
        // actualizar
        this.empresaService.actualizar_empresa(entidadForm.value)        
        .subscribe(data => {
          location.reload();
        });
      }
    }
  }

}
