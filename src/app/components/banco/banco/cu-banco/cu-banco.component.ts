import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

import { BancoService } from '../../../../services/banco/banco.service';

@Component({
  selector: 'app-cu-banco',
  templateUrl: './cu-banco.component.html',
  styleUrls: ['./cu-banco.component.css']
})
export class CuBancoComponent implements OnInit {

  constructor(
    public bancoService: BancoService
  ) { }

  ngOnInit() {
  }

  guardarEntidad(entidadForm: NgForm) {
    if (entidadForm.valid) {
      if (entidadForm.value.IdBanco == null) {
        // Nuevo
        this.bancoService.insertar_banco(entidadForm.value)        
        .subscribe(data => {
          location.reload();
        });
      } else {
        // actualizar
        this.bancoService.actualizar_banco(entidadForm.value)        
        .subscribe(data => {
          location.reload();
        });
      }
    }
  }

}
