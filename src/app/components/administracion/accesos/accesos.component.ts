import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../services/menu.service';
import { AccesoService } from '../../../services/administracion/acceso.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accesos',
  templateUrl: './accesos.component.html',
  styleUrls: ['./accesos.component.css']
})
export class AccesosComponent implements OnInit {
  accesos = [];
  accesosTable = [];
  accesosPadre = [];
  fieldSort: string;
  fieldSortDirection: string;
  accesoDelete = [];
  filterByField = false;

  constructor(
    private spinner: NgxSpinnerService,
    private accesoService: AccesoService,
    private menuService: MenuService,
    private authService: AuthService,
    private router: Router
  ) {
    this.menuService.titleActive = 'Accesos';
  }

  ngOnInit() {
    this.obtenerAccesos();
  }

  obtenerAccesos() {
    this.spinner.show();
    this.accesoService.cargar_accesos()
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }))
    .subscribe(data => {
      this.spinner.hide();
      // console.log(data.data.accesospadre);
      console.log(data);
      if (typeof data.error !== 'undefined' && !data.error) {
        this.accesos = data.data.accesos;
        this.accesosTable = this.accesos;
        this.accesoService.accesosPadre.push(Array('', '', ''));
        data.data.accesospadre.forEach(element => {
          this.accesoService.accesosPadre.push(element);
        });
        // this.accesoService.accesosPadre = data.data.accesospadre;
      } else if (typeof data.error !== 'undefined' && data.error) {
        if (data.mensaje === 'Token inválido') {
          this.authService.logout();
          this.router.navigate(['login']);
        }
      } else {
        console.log(data.mensaje);
      }
    });
  }

  setAccesoDel(acceso: any) {
    this.accesoDelete = acceso;
  }

  eliminarAcceso(id: string) {
    this.accesoDelete = [];
    this.spinner.show();
    this.accesoService.eliminar_acceso(id)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }))
    .subscribe(data => {
      this.spinner.hide();
      if (typeof data.error !== 'undefined' && !data.error) {
        this.obtenerAccesos();
      } else if (typeof data.error !== 'undefined' && data.error) {
        if (data.mensaje === 'Token inválido') {
          this.authService.logout();
          this.router.navigate(['login']);
        }
      } else {
        console.log(data.mensaje);
      }
    });
  }


  preActualizarAcceso(acceso) {
    this.accesoService.selectAcceso = Object.assign(acceso);
  }

  limpiarForm() {
    this.accesoService.selectAcceso = {
      id: null,
      nombre: '',
      id_acceso_padre: '',
      ruta: ''
    };
  }




  isNumber(value: string | number): boolean {
   return ((value != null) && !isNaN(Number(value.toString())));
  }

  // Funcion para ordenar
  funcSort(control) {
    // console.log(control);

    // Limpia el icono de ordenamiento para todos los campos
    for (const eachTh in control.target.parentElement.children) {
      if (Object.prototype.toString.call(control.target.parentElement.children[eachTh]) === '[object HTMLTableCellElement]') {
        for (const element in control.target.parentElement.children[eachTh].children) {
          if (Object.prototype.toString.call(control.target.parentElement.children[eachTh].children[element]) === '[object HTMLElement]') {
            if (control.target.parentElement.children[eachTh].children[element].localName === 'i') {
              control.target.parentElement.children[eachTh].children[element].className = '';
            }
          }
        }
      }
    }

    const field: string = control.target.dataset.toggle;

    if (!this.fieldSort || this.fieldSort !== field) {
      this.accesosTable.sort((a, b) => {
        if (this.isNumber(a[field]) && this.isNumber(b[field])) {
          if (Number(a[field]) > Number(b[field])) {
            return 1;
          }
          if (Number(a[field]) < Number(b[field])) {
            return -1;
          }
          return 0;
        } else {
          if (a[field] == null && b[field] == null) {
            return 0;
          }
          if (a[field] == null && b[field] !== null) {
            return -1;
          }
          if (a[field] !== null && b[field] == null) {
            return 1;
          }
          return a[field].toString().localeCompare(b[field].toString());
        }
      });
      this.fieldSortDirection = 'asc';
    } else {
      this.accesosTable.sort((a, b) => {
        return -1;
      });
      this.fieldSortDirection = this.fieldSortDirection === 'asc' ? 'desc' : 'asc';
    }

    // Coloca icono de ordenamiento para el campo seleccionado
    for (const element in control.target.children) {
      if (Object.prototype.toString.call(control.target.children[element]) === '[object HTMLElement]') {
        if (control.target.children[element].localName === 'i') {
          control.target.children[element].className = this.fieldSortDirection === 'asc' ? 'fa fa-long-arrow-up' : 'fa fa-long-arrow-down';
        }
      }
    }
    this.fieldSort = field;
  }

  // Funcion para buscar
  funcSearch(ev) {
    const arrayBuscar = ev.toString().split(' ');

    if (ev.length > 0) {
      this.accesosTable = this.accesos.filter(proyecto => {
        let respuesta: boolean;
        for (const element in proyecto) {
          if (proyecto[element] != null) {
            let count = 0;
            let respTem = false;
            arrayBuscar.forEach(palabra => {
              count ++;
              if (palabra !== '' && (count === 1 || count > 1 && respTem === true)) {
                console.log(palabra);
                if (proyecto[element].toString().toLowerCase().indexOf(palabra.toString().toLowerCase()) !== -1) {
                  respTem = true;
                } else {
                  if (count > 1 && respTem === true) {
                    respTem = false;
                  }
                }
              }
            });
            if (respTem) {
              respuesta = respTem;
            }
          }
        }
        return respuesta;
      });
    } else {
      this.accesosTable = this.accesos;
    }
  }
}
