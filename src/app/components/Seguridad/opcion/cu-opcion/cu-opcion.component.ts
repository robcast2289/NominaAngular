import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

import { OpcionService } from '../../../../services/seguridad/opcion.service';

@Component({
  selector: 'app-cu-opcion',
  templateUrl: './cu-opcion.component.html',
  styleUrls: ['./cu-opcion.component.css']
})
export class CuOpcionComponent implements OnInit {

  constructor(
    public opcionService:OpcionService
  ) { }

  ngOnInit() {
  }

  guardarEntidad(entidadForm: NgForm) {
    if (entidadForm.valid) {
      if (entidadForm.value.IdOpcion == null) {
        // Nuevo
        this.opcionService.insertar_opciones(entidadForm.value)        
        .subscribe(data => {
          location.reload();
        });
      } else {
        // actualizar
        this.opcionService.actualizar_opciones(entidadForm.value)        
        .subscribe(data => {
          location.reload();
        });
      }
    }
  }

}
