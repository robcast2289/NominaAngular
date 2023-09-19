import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

import { EstadousuarioService } from '../../../../services/seguridad/estadousuario.service';

@Component({
  selector: 'app-cu-status-usuario',
  templateUrl: './cu-status-usuario.component.html',
  styleUrls: ['./cu-status-usuario.component.css']
})
export class CuStatusUsuarioComponent implements OnInit {

  constructor(
    private statusUsuarioService:EstadousuarioService
  ) { }

  ngOnInit() {
  }

  guardarEntidad(entidadForm: NgForm) {
    if (entidadForm.valid) {
      if (entidadForm.value.IdStatusUsuario == null) {
        // Nuevo
        this.statusUsuarioService.insertar_status_usuario(entidadForm.value)        
        .subscribe(data => {
          location.reload();
        });
      } else {
        // actualizar
        this.statusUsuarioService.actualizar_status_usuario(entidadForm.value)        
        .subscribe(data => {
          location.reload();
        });
      }
    }
  }

}
