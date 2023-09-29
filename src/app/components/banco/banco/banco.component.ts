import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TablaBase } from '../../../services/base/tabla.model';
import { NgxSpinnerService } from 'ngx-spinner';

import { MenuService } from '../../../services/menu.service';
import { BancoService } from '../../../services/banco/banco.service';

@Component({
  selector: 'app-banco',
  templateUrl: './banco.component.html',
  styleUrls: ['./banco.component.css']
})
export class BancoComponent extends TablaBase implements OnInit {

  constructor(private spinner: NgxSpinnerService,
    public bancoService: BancoService,
    private router: Router,
    private menuService: MenuService) {
      super();
      this.menuService.titleActive = 'Bancos';
     }

  ngOnInit() {
    this.obtenerPermisos();
    this.obtenerBanco();
  }

  obtenerPermisos(){
    this.menuService.permisosOpcion(this.bancoService.authService.credenciales.userId,this.router.url)
    .subscribe(data=>{
      this.Permisos = data;
    });
  }

  obtenerBanco(){
    this.spinner.show();
    this.bancoService.cargar_bancos()
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
    this.bancoService.eliminar_banco(id)
    .subscribe(data => {
      this.spinner.hide();
      if(this.bancoService.errorMessage){
        this.myAlertTop();
      }
      this.obtenerBanco();
    });
  }

  preActualizarEntidad(entidad) {
    //this.proyService.selectProyecto = Object.assign(proyecto);
    this.limpiarForm();
    this.bancoService.selectEntidad = {
      IdBanco: entidad.IdBanco,
      Nombre: entidad.Nombre,
    };
  }

  limpiarForm() {
    this.bancoService.selectEntidad = {
      IdBanco: null,
      Nombre: null,
    };
  }

  myAlertTop(){
    $(".myAlert-top").show();
    setTimeout(function(){
      $(".myAlert-top").hide();   
      this.opcionService.errorMessage = "";    
    }, 8000);    
  }

}
