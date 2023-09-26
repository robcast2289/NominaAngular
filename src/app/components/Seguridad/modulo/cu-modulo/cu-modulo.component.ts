import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

import { ModuloService } from '../../../../services/seguridad/modulo.service';

@Component({
  selector: 'app-cu-modulo',
  templateUrl: './cu-modulo.component.html',
  styleUrls: ['./cu-modulo.component.css']
})
export class CuModuloComponent implements OnInit {

  constructor(
    public moduloService:ModuloService
  ) { }

  ngOnInit() {
  }

  guardarEntidad(moduloForm: NgForm) {
    if (moduloForm.valid) {
      if (moduloForm.value.IdModulo == null) {
        // Nuevo
        this.moduloService.insertar_modulo(moduloForm.value)        
        .subscribe(data => {
          location.reload();
        });
      } else {
        // actualizar
        this.moduloService.actualizar_modulo(moduloForm.value)        
        .subscribe(data => {
          location.reload();
        });
      }
    }
  }

}
