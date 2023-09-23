import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

import { GenerosService } from '../../../../services/seguridad/generos.service';

@Component({
  selector: 'app-cu-genero',
  templateUrl: './cu-genero.component.html',
  styleUrls: ['./cu-genero.component.css']
})
export class CuGeneroComponent implements OnInit {

  constructor(
    public generoService:GenerosService
  ) { }

  ngOnInit() {
  }

  guardarEntidad(entidadForm: NgForm) {
    if (entidadForm.valid) {
      if (entidadForm.value.IdGenero == null) {
        // Nuevo
        this.generoService.insertar_generos(entidadForm.value)        
        .subscribe(data => {
          location.reload();
        });
      } else {
        // actualizar
        this.generoService.actualizar_generos(entidadForm.value)        
        .subscribe(data => {
          location.reload();
        });
      }
    }
  }

}
