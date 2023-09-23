import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

import { RolesService } from '../../../../services/seguridad/roles.service';

@Component({
  selector: 'app-cu-roles',
  templateUrl: './cu-roles.component.html',
  styleUrls: ['./cu-roles.component.css']
})
export class CuRolesComponent implements OnInit {

  constructor(
    public rolesService:RolesService
  ) { }

  ngOnInit() {
  }

  guardarEntidad(entidadForm: NgForm) {
    if (entidadForm.valid) {
      if (entidadForm.value.IdRole == null) {
        // Nuevo
        this.rolesService.insertar_roles(entidadForm.value)        
        .subscribe(data => {
          location.reload();
        });
      } else {
        // actualizar
        this.rolesService.actualizar_roles(entidadForm.value)        
        .subscribe(data => {
          location.reload();
        });
      }
    }
  }

}
