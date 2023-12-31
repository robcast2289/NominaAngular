import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TablaBase } from '../../../services/base/tabla.model';
import { NgxSpinnerService } from 'ngx-spinner';

import { MenuService } from '../../../services/menu.service';
import { BitacoraaccesoService } from '../../../services/seguridad/bitacoraacceso.service';

@Component({
  selector: 'app-bitacora-acceso',
  templateUrl: './bitacora-acceso.component.html',
  styleUrls: ['./bitacora-acceso.component.css']
})
export class BitacoraAccesoComponent extends TablaBase implements OnInit {

  constructor(private spinner: NgxSpinnerService,
    private bitacoraService: BitacoraaccesoService,
    private router: Router,
    private menuService: MenuService) {
      super();
      this.menuService.titleActive = 'Bitacora Acceso';
     }

  ngOnInit() {
    this.obtenerPermisos();
    this.obtenerBitacora();
  }

  obtenerPermisos(){
    this.menuService.permisosOpcion(this.bitacoraService.authService.credenciales.userId,this.router.url)
    .subscribe(data=>{
      this.Permisos = data;
    });
  }

  obtenerBitacora(){
    this.spinner.show();
    this.bitacoraService.cargar_bitacora()
    .subscribe(data => {
      this.spinner.hide();
      this.entidad = data;
      this.entidad.forEach(element => {
        const date = new Date(element["FechaAcceso"]);
        var dateInMlSeconds = date.getTime();
        var diffMlSeconds = (6 * 60) * 60000;
        var localDate = new Date(dateInMlSeconds - diffMlSeconds)
        element["FechaAcceso"] = this.formatDate(localDate);
        //element["FechaAcceso"] = date.toLocaleTimeString("es-GT");
      });
      this.entidadTable = this.entidad;
    });
  }  

}
