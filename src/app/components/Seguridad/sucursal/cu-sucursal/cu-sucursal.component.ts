import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

import { SucursalesService } from '../../../../services/seguridad/sucursales.service';

@Component({
  selector: 'app-cu-sucursal',
  templateUrl: './cu-sucursal.component.html',
  styleUrls: ['./cu-sucursal.component.css']
})
export class CuSucursalComponent implements OnInit {

  constructor(
    public sucursalService:SucursalesService
  ) { }

  ngOnInit() {
  }

  guardarEntidad(entidadForm: NgForm) {
    if (entidadForm.valid) {
      if (entidadForm.value.IdSucursal == null) {
        // Nuevo
        this.sucursalService.insertar_sucursal(entidadForm.value)        
        .subscribe(data => {
          location.reload();
        });
      } else {
        // actualizar
        this.sucursalService.actualizar_sucursal(entidadForm.value)        
        .subscribe(data => {
          location.reload();
        });
      }
    }
  }

}
