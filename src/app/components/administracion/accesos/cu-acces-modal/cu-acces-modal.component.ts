import { Component, OnInit, ElementRef } from '@angular/core';
import { AccesoService } from '../../../../services/administracion/acceso.service';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cu-acces-modal',
  templateUrl: './cu-acces-modal.component.html',
  styleUrls: ['./cu-acces-modal.component.css']
})
export class CuAccesModalComponent implements OnInit {

  constructor(
    public accesoService: AccesoService,
    private authService: AuthService,
    private router: Router,
    private location: Location,
    private el: ElementRef
  ) { }

  ngOnInit() {
    /* const item = document.getElementsByClassName('btn-danger');
    console.log(item);
    item[1].classList.toggle('text-success'); */

    /* const parent = this.el.nativeElement.parentNode;
    const span = document.createElement('span');
    span.innerHTML = `Show password`;
    span.addEventListener('click', (event) => {
      alert('you just clicked me, you need to toggle view');
    });
    parent.appendChild(span); */
  }

  guardarAcceso(form: NgForm) {
    if (form.valid) {
      if (form.value.id == null) {
        // Nuevo
        this.accesoService.insertar_acceso(form.value)
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
        this.accesoService.actualizar_acceso(form.value)
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
