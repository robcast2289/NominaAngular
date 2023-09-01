import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

import { ProyectoService } from '../../../services/catalogos/proyecto.service';
import { AuthService } from '../../../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuService } from '../../../services/menu.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  proyectos = [];
  proyectosTable = [];
  buscar: string;
  page = 1;
  fieldSort: string;
  fieldSortDirection: string;
  proyectoDelete = [];


  constructor(private spinner: NgxSpinnerService,
              private authService: AuthService,
              private proyService: ProyectoService,
              private router: Router,
              private menuService: MenuService) {
                this.menuService.titleActive = 'Proyectos';
               }

  ngOnInit() {
    this.obtenerProyectos();
  }

  obtenerProyectos() {
    this.spinner.show();
    this.proyService.cargar_proyectos()
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }))
    .subscribe(data => {
      this.spinner.hide();
      // console.log(data);
      if (typeof data.error !== 'undefined' && !data.error) {
        this.proyectos = data.data;
        this.proyectosTable = this.proyectos;
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

  setProyectoDel(proyecto: any) {
    this.proyectoDelete = proyecto;
  }

  eliminarProyecto(id: string) {
    this.proyectoDelete = [];
    this.spinner.show();
    this.proyService.eliminar_proyecto(id)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }))
    .subscribe(data => {
      this.spinner.hide();
      if (typeof data.error !== 'undefined' && !data.error) {
        console.log(data);
        this.obtenerProyectos();
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

  preActualizarProyecto(proyecto) {
    this.proyService.selectProyecto = Object.assign(proyecto);
  }

  limpiarForm() {
    this.proyService.selectProyecto = {
      idproyecto: null,
      nombre: '',
      nombreedificio: '',
      entidadvendedora: '',
      direccion: '',
      area: '',
      finca: '',
      folio: '',
      libro: '',
      fechavencimiento: '',
      dialimite: '',
      porcentajemora: '',
      valortipocambio: '',
      nombre_rep: '',
      fechanac_rep: '',
      estadocivil_rep: '',
      dpi_rep: '',
      descripcion_rep: '',
      fechaactanotarial: '',
      notario: '',
      registro: '',
      folio_reg: '',
      libro_reg: '',
      fecha_reg: '',
      textocorreo: ''
    };
  }


  // Funcion para ordenar
  funcSort(control) {
    const field: string = control.target.dataset.toggle;

    if (!this.fieldSort || this.fieldSort !== field) {
      this.proyectosTable.sort((a, b) => {
        if (a[field] > b[field]) {
          return 1;
        }
        if (a[field] < b[field]) {
          return -1;
        }
        return 0;
      });
      this.fieldSortDirection = 'asc';
    } else {
      this.proyectosTable.sort((a, b) => {
        return -1;
      });
      if (this.fieldSortDirection === 'asc') {
        this.fieldSortDirection = 'desc';
      } else {
        this.fieldSortDirection = 'asc';
      }
    }

    this.fieldSort = field;
  }

  // Funcion para buscar
  funcSearch(ev) {
    const arrayBuscar = ev.toString().split(' ');

    if (ev.length > 0) {
      this.proyectosTable = this.proyectos.filter(proyecto => {
        let respuesta: boolean;
        for (const element in proyecto) {
          if (proyecto[element] != null) {
            arrayBuscar.forEach(palabra => {
              if (palabra !== '') {
                if (proyecto[element].toString().toLowerCase().indexOf(palabra.toString().toLowerCase()) !== -1) {
                  respuesta = true;
                }
              }
            });
          }
        }
        return respuesta;
      });
    } else {
      this.proyectosTable = this.proyectos;
    }
  }

}
