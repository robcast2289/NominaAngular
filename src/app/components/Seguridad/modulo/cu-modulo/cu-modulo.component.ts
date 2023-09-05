import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

import { ModuloService } from '../../../../services/seguridad/modulo.service';

@Component({
  selector: 'app-cu-modulo',
  templateUrl: './cu-modulo.component.html',
  styleUrls: ['./cu-modulo.component.css']
})
export class CuModuloComponent implements OnInit {

  constructor(
    private moduloService:ModuloService
  ) { }

  ngOnInit() {
  }

  guardarEntidad(moduloForm: NgForm) {
    if (moduloForm.valid) {
      if (moduloForm.value.IdModulo == null) {
        // Nuevo
        this.moduloService.insertar_modulo(moduloForm.value)        
        .subscribe(data => {
          location.reload();
          /* if (typeof data.error !== 'undefined' && !data.error) {
            location.reload();
          } else if (typeof data.error !== 'undefined' && data.error) {
            if (data.mensaje === 'Token inválido') {
              this.authService.logout();
              this.router.navigate(['login']);
            } else {
              console.log(data.mensaje);
            }
          } else {
            console.log(data);
          } */
        });
      } else {
        // actualizar
        this.moduloService.actualizar_modulo(moduloForm.value)        
        .subscribe(data => {
          location.reload();
          /* if (typeof data.error !== 'undefined' && !data.error) {
            location.reload();
          } else if (typeof data.error !== 'undefined' && data.error) {
            if (data.mensaje === 'Token inválido') {
              this.authService.logout();
              this.router.navigate(['login']);
            } else {
              console.log(data.mensaje);
            }
          } else {
            console.log(data);
          } */
        });
      }
    }
  }

}
