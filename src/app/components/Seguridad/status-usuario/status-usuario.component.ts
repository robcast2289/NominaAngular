import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';

import { MenuService } from '../../../services/menu.service';
import { EstadousuarioService } from '../../../services/seguridad/estadousuario.service';

@Component({
  selector: 'app-status-usuario',
  templateUrl: './status-usuario.component.html',
  styleUrls: ['./status-usuario.component.css']
})
export class StatusUsuarioComponent implements OnInit {
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
    private statusUsuarioService: EstadousuarioService,
    private router: Router,
    private menuService: MenuService) {
      this.menuService.titleActive = 'Estados del Usurio';
     }

  ngOnInit() {
    this.obtenerPermisos();
    this.obtenerStatusUsuario();
  }

  obtenerPermisos(){
    this.menuService.permisosOpcion(this.statusUsuarioService.authService.credenciales.userId,this.router.url)
    .subscribe(data=>{
      this.Permisos = data;
    });
  }

  obtenerStatusUsuario(){
    this.spinner.show();
    this.statusUsuarioService.cargar_status_usuario()
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
