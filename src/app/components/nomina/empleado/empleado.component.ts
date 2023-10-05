import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TablaBase } from '../../../services/base/tabla.model';
import { NgxSpinnerService } from 'ngx-spinner';

import { MenuService } from '../../../services/menu.service';
import { EmpleadoService } from '../../../services/nomina/empleado.service';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent extends TablaBase implements OnInit {

  constructor(private spinner: NgxSpinnerService,
    public empleadoService: EmpleadoService,
    private router: Router,
    private menuService: MenuService) {
      super();
      this.menuService.titleActive = 'Empleados';
     }

  ngOnInit() {
    this.obtenerPermisos();
    this.obtenerEmpleado();
  }

  obtenerPermisos(){
    this.menuService.permisosOpcion(this.empleadoService.authService.credenciales.userId,this.router.url)
    .subscribe(data=>{
      this.Permisos = data;
    });
  }

  obtenerEmpleado(){
    this.spinner.show();
    this.empleadoService.cargar_empleado()
    .subscribe(data => {
      this.spinner.hide();
      this.entidad = data;
      this.entidad.forEach(element => {
        //console.log(element);
        element["FechaContratacion"] = this.formatDate(new Date(element["FechaContratacion"]+" 00:00:00"),false);
      });
      this.entidadTable = this.entidad;
    });
  }

}
