import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';

import { MenuService } from '../../../services/menu.service';
import { EmpresasService } from '../../../services/seguridad/empresas.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {
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
    private empresaService: EmpresasService,
    private router: Router,
    private menuService: MenuService) {
      this.menuService.titleActive = 'Empresas';
     }

  ngOnInit() {
    this.obtenerPermisos();
    this.obtenerEmpresas();
  }

  obtenerPermisos(){
    this.menuService.permisosOpcion(this.empresaService.authService.credenciales.userId,this.router.url)
    .subscribe(data=>{
      this.Permisos = data;
    });
  }

  obtenerEmpresas(){
    this.spinner.show();
    this.empresaService.cargar_empresas()
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
    this.empresaService.eliminar_empresa(id)
    .subscribe(data => {
      this.spinner.hide();
      this.obtenerEmpresas();
    });
  }

  preActualizarEntidad(entidad) {
    //this.proyService.selectProyecto = Object.assign(proyecto);
    console.log(entidad);
    this.empresaService.selectEntidad = {
      IdEmpresa: entidad.IdEmpresa,
      Nombre: entidad.Nombre,
      Direccion: entidad.Direccion,
      Nit: entidad.Nit,
      PasswordCantidadMayusculas: entidad.PasswordCantidadMayusculas,
      PasswordCantidadMinusculas: entidad.PasswordCantidadMinusculas,
      PasswordCantidadCaracteresEspeciales: entidad.PasswordCantidadCaracteresEspeciales,
      PasswordCantidadCaducidadDias: entidad.PasswordCantidadCaducidadDias,
      PasswordLargo: entidad.PasswordLargo,
      PasswordIntentosAntesDeBloquear: entidad.PasswordIntentosAntesDeBloquear,
      PasswordCantidadNumeros: entidad.PasswordCantidadNumeros,
      PasswordCantidadPreguntasValidar: entidad.PasswordCantidadPreguntasValidar
    };
  }

  limpiarForm() {
    this.empresaService.selectEntidad = {
      IdEmpresa:null,
      Nombre:null,
      Direccion:null,
      Nit:null,
      PasswordCantidadMayusculas:0,
      PasswordCantidadMinusculas:0,
      PasswordCantidadCaracteresEspeciales:0,
      PasswordCantidadCaducidadDias:0,
      PasswordLargo:1,
      PasswordIntentosAntesDeBloquear:3,
      PasswordCantidadNumeros:0,
      PasswordCantidadPreguntasValidar:1
    };
  }

}
