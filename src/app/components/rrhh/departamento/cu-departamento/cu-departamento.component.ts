import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

import { DepartamentoService } from '../../../../services/rrhh/departamento.service';

@Component({
  selector: 'app-cu-departamento',
  templateUrl: './cu-departamento.component.html',
  styleUrls: ['./cu-departamento.component.css']
})
export class CuDepartamentoComponent implements OnInit {

  constructor(
    public departamentoService:DepartamentoService
  ) { }

  ngOnInit() {
  }

  guardarEntidad(entidadForm: NgForm) {
    if (entidadForm.valid) {
      if (entidadForm.value.IdDepartamento == null) {
        // Nuevo
        this.departamentoService.insertar_departamento(entidadForm.value)        
        .subscribe(data => {
          location.reload();
        });
      } else {
        // actualizar
        this.departamentoService.actualizar_departamento(entidadForm.value)        
        .subscribe(data => {
          location.reload();
        });
      }
    }
  }

}
