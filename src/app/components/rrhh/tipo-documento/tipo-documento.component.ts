import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TablaBase } from '../../../services/base/tabla.model';
import { NgxSpinnerService } from 'ngx-spinner';

import { MenuService } from '../../../services/menu.service';
import { TipodocumentoService } from '../../../services/rrhh/tipodocumento.service';

@Component({
  selector: 'app-tipo-documento',
  templateUrl: './tipo-documento.component.html',
  styleUrls: ['./tipo-documento.component.css']
})
export class TipoDocumentoComponent extends TablaBase implements OnInit {

  constructor(private spinner: NgxSpinnerService,
    public tipodocumentoService: TipodocumentoService,
    private router: Router,
    private menuService: MenuService) {
      super();
      this.menuService.titleActive = 'Tipos de Documento';
     }

  ngOnInit() {
    this.obtenerPermisos();
    this.obtenerTipoDocumento();
  }

  obtenerPermisos(){
    this.menuService.permisosOpcion(this.tipodocumentoService.authService.credenciales.userId,this.router.url)
    .subscribe(data=>{
      this.Permisos = data;
    });
  }

  obtenerTipoDocumento(){
    this.spinner.show();
    this.tipodocumentoService.cargar_tipodocumento()
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
    this.tipodocumentoService.eliminar_tipodocumento(id)
    .subscribe(data => {
      this.spinner.hide();
      if(this.tipodocumentoService.errorMessage){
        this.myAlertTop();
      }
      else{
        this.obtenerTipoDocumento();
      }
    });
  }

  preActualizarEntidad(entidad) {
    this.limpiarForm();
    this.tipodocumentoService.selectEntidad = {
      IdTipoDocumento: entidad.IdTipoDocumento,
      Nombre: entidad.Nombre,
    };
  }

  limpiarForm() {
    this.tipodocumentoService.selectEntidad = {
      IdTipoDocumento: null,
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
