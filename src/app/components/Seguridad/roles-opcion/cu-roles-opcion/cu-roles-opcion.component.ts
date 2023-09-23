import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

import { RolesopcionService } from '../../../../services/seguridad/rolesopcion.service';

@Component({
  selector: 'app-cu-roles-opcion',
  templateUrl: './cu-roles-opcion.component.html',
  styleUrls: ['./cu-roles-opcion.component.css']
})
export class CuRolesOpcionComponent implements OnInit {
  @Input() IdRoleParent: number;

  constructor(
    public roleopcionesService:RolesopcionService
  ) { }

  ngOnInit() {
  }

  guardarEntidad(entidadForm: NgForm) {
    if (entidadForm.valid) {
      if (entidadForm.value.IdRole == null) {
        // Nuevo
        this.roleopcionesService.insertar_roleopciones(this.IdRoleParent,entidadForm.value)        
        .subscribe(data => {
          location.reload();
        });
      } else {
        // actualizar
        this.roleopcionesService.actualizar_roleopciones(this.IdRoleParent,entidadForm.value)        
        .subscribe(data => {
          location.reload();
        });
      }
    }
  }

}
