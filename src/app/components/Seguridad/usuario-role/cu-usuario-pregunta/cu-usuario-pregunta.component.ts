import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

import { UsuarioroleService } from '../../../../services/seguridad/usuariorole.service';

@Component({
  selector: 'app-cu-usuario-pregunta',
  templateUrl: './cu-usuario-pregunta.component.html',
  styleUrls: ['./cu-usuario-pregunta.component.css']
})
export class CuUsuarioPreguntaComponent implements OnInit {
  @Input() IdUsuarioParent: number;

  constructor(
    public usuarioroleService:UsuarioroleService
  ) { }

  ngOnInit() {
  }

  guardarEntidad(entidadForm: NgForm) {
    if (entidadForm.valid) {
      if (entidadForm.value.IdPregunta == null) {
        // Nuevo
        /* this.usuarioroleService.insertar_usuarioroles(this.IdUsuarioParent,entidadForm.value)        
        .subscribe(data => {
          location.reload();
        }); */
      }
    }
  }

}
