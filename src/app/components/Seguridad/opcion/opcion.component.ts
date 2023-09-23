import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TablaBase } from '../../../services/base/tabla.model';
import { NgxSpinnerService } from 'ngx-spinner';

import { MenuService } from '../../../services/menu.service';
import { OpcionService } from '../../../services/seguridad/opcion.service';

@Component({
  selector: 'app-opcion',
  templateUrl: './opcion.component.html',
  styleUrls: ['./opcion.component.css']
})
export class OpcionComponent extends TablaBase implements OnInit {

  constructor(private spinner: NgxSpinnerService,
    public opcionService: OpcionService,
    private router: Router,
    private menuService: MenuService) {
      super();
      this.menuService.titleActive = 'Opciones';
     }

  ngOnInit() {
    this.obtenerPermisos();
    this.obtenerOpciones();
  }

  obtenerPermisos(){
    this.menuService.permisosOpcion(this.opcionService.authService.credenciales.userId,this.router.url)
    .subscribe(data=>{
      this.Permisos = data;
    });
  }

  obtenerOpciones(){
    this.spinner.show();
    this.opcionService.cargar_opciones()
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
    this.opcionService.eliminar_opciones(id)
    .subscribe(data => {
      this.spinner.hide();
      if(this.opcionService.errorMessage){
        this.myAlertTop();
      }
      this.obtenerOpciones();
    });
  }

  preActualizarEntidad(entidad) {
    //this.proyService.selectProyecto = Object.assign(proyecto);
    this.limpiarForm();
    this.opcionService.selectEntidad = {
      IdOpcion: entidad.IdOpcion,
      IdMenu: entidad.IdMenu,
      Nombre: entidad.Nombre,
      OrdenMenu: entidad.OrdenMenu,
      Pagina: entidad.Pagina
    };
  }

  limpiarForm() {
    this.obtenerMenus();
    this.opcionService.selectEntidad = {
      IdOpcion: null,
      IdMenu: null,
      Nombre: '',
      OrdenMenu: '',
      Pagina: ''
    };
  }

  obtenerMenus(){
    this.opcionService.cargar_menus()
    .subscribe(data => {
      this.opcionService.menus = data;
    });
  }

  myAlertTop(){
    $(".myAlert-top").show();
    setTimeout(function(){
      $(".myAlert-top").hide();   
      this.opcionService.errorMessage = "";    
    }, 8000);    
  }

}
