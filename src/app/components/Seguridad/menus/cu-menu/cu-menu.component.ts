import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

import { MenuTableService } from '../../../../services/seguridad/menutable.service';

@Component({
  selector: 'app-cu-menu',
  templateUrl: './cu-menu.component.html',
  styleUrls: ['./cu-menu.component.css']
})
export class CuMenuComponent implements OnInit {

  constructor(
    public menuTableService:MenuTableService,
  ) { }

  ngOnInit() {
  }

  guardarEntidad(entidadForm: NgForm) {
    if (entidadForm.valid) {
      if (entidadForm.value.IdMenu == null) {
        // Nuevo
        this.menuTableService.insertar_menus(entidadForm.value)        
        .subscribe(data => {
          location.reload();
        });
      } else {
        // actualizar
        this.menuTableService.actualizar_menus(entidadForm.value)        
        .subscribe(data => {
          location.reload();
        });
      }
    }
  }

}
