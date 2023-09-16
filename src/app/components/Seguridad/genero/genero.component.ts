import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';

import { MenuService } from '../../../services/menu.service';
import { GenerosService } from '../../../services/seguridad/generos.service';

@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html',
  styleUrls: ['./genero.component.css']
})
export class GeneroComponent implements OnInit {
  entidad = [];
  entidadTable = [];
  buscar: string;
  page = 1;
  fieldSort: string;
  fieldSortDirection: string;
  entidadDelete = [];
  Permisos:any = {
    Alta:0,
    Baja:0,
    Cambio:0
  }

  constructor(private spinner: NgxSpinnerService,
    private generoService: GenerosService,
    private router: Router,
    private menuService: MenuService) {
      this.menuService.titleActive = 'Generos';
     }

  ngOnInit() {
    this.obtenerGeneros();
    this.obtenerEmpresas();
  }

  obtenerGeneros(){
    this.menuService.permisosOpcion(this.generoService.authService.credenciales.userId,this.router.url)
    .subscribe(data=>{
      this.Permisos = data;
    });
  }

  obtenerEmpresas(){
    this.spinner.show();
    this.generoService.cargar_generos()
    .subscribe(data => {
      this.spinner.hide();
      this.entidad = data;
      this.entidadTable = this.entidad;
    });
  }

  setEntidadDel(entidad: any) {
    this.entidadDelete = entidad;
  }

}
