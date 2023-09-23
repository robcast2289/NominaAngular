import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

import { UsuarioroleService } from '../../../../services/seguridad/usuariorole.service';

@Component({
  selector: 'app-cu-usuario-role',
  templateUrl: './cu-usuario-role.component.html',
  styleUrls: ['./cu-usuario-role.component.css']
})
export class CuUsuarioRoleComponent implements OnInit {
  @Input() IdUsuarioParent: number;

  constructor(
    public usuarioroleService:UsuarioroleService
  ) { }

  ngOnInit() {
  }

  guardarEntidad(entidadForm: NgForm) {
    if (entidadForm.valid) {
      if (entidadForm.value.IdUsuario == null) {
        // Nuevo
        this.usuarioroleService.insertar_usuarioroles(this.IdUsuarioParent,entidadForm.value)        
        .subscribe(data => {
          location.reload();
        });
      }
    }
  }

}
