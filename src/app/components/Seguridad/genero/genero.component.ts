import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TablaBase } from '../../../services/base/tabla.model';
import { NgxSpinnerService } from 'ngx-spinner';

import { MenuService } from '../../../services/menu.service';
import { GenerosService } from '../../../services/seguridad/generos.service';

@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html',
  styleUrls: ['./genero.component.css']
})
export class GeneroComponent extends TablaBase implements OnInit {

  constructor(private spinner: NgxSpinnerService,
    private generoService: GenerosService,
    private router: Router,
    private menuService: MenuService) {
      super();
      this.menuService.titleActive = 'Generos';
     }

  ngOnInit() {
    this.obtenerPermisos();
    this.obtenerGeneros();
  }

  obtenerPermisos(){
    this.menuService.permisosOpcion(this.generoService.authService.credenciales.userId,this.router.url)
    .subscribe(data=>{
      this.Permisos = data;
    });
  }

  obtenerGeneros(){
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

  eliminarEntidad(id: string) {
    this.entidadDelete = [];
    this.spinner.show();
    this.generoService.eliminar_generos(id)
    .subscribe(data => {
      this.spinner.hide();
      this.obtenerGeneros();
    });
  }

  preActualizarEntidad(entidad) {
    this.generoService.selectEntidad = {
      IdGenero: entidad.IdGenero,
      Nombre: entidad.Nombre,
    };
  }

  limpiarForm() {
    this.generoService.selectEntidad = {
      IdGenero:null,
      Nombre:null,
    };
  }

}
