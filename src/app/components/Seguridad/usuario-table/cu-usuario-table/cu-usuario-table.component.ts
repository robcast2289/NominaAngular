import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UsuariotableService } from '../../../../services/seguridad/usuariotable.service';

@Component({
  selector: 'app-cu-usuario-table',
  templateUrl: './cu-usuario-table.component.html',
  styleUrls: ['./cu-usuario-table.component.css']
})
export class CuUsuarioTableComponent implements OnInit {

  constructor(
    private usuarioTableService:UsuariotableService
  ) { }

  ngOnInit() {
  }

  guardarEntidad(entidadForm: NgForm) {
    if (entidadForm.valid) {
      if (entidadForm.value.IdUsuario == null) {
        // Nuevo
        this.usuarioTableService.insertar_usuarios(entidadForm.value)        
        .subscribe(data => {
          location.reload();
        });
      } else {
        // actualizar
        this.usuarioTableService.actualizar_usuarios(entidadForm.value)        
        .subscribe(data => {
          location.reload();
        });
      }
    }
  }

}
