import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProyectoService } from '../../../../services/catalogos/proyecto.service';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';


declare var require: any;
const $ = require('jquery');

@Component({
  selector: 'app-cu-proy-modal',
  templateUrl: './cu-proy-modal.component.html',
  styleUrls: ['./cu-proy-modal.component.css']
})
export class CuProyModalComponent implements OnInit {

  constructor(
    public proyService: ProyectoService,
    private authService: AuthService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
  }

  guardarProyecto(proyectoForm: NgForm) {
    if (proyectoForm.valid) {
      if (proyectoForm.value.idproyecto == null) {
        // Nuevo
        this.proyService.insertar_proyecto(proyectoForm.value)
        .pipe(catchError(data => {
          return of(data).pipe(
            map(val => data.error)
          );
        }))
        .subscribe(data => {
          if (typeof data.error !== 'undefined' && !data.error) {
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
          }
        });
      } else {
        // actualizar
        this.proyService.actualizar_proyecto(proyectoForm.value)
        .pipe(catchError(data => {
          return of(data).pipe(
            map(val => data.error)
          );
        }))
        .subscribe(data => {
          if (typeof data.error !== 'undefined' && !data.error) {
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
          }
        });
      }
    }
  }

}
