import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

import { EmpleadoService } from '../../../../services/nomina/empleado.service';

@Component({
  selector: 'app-c-empleado',
  templateUrl: './c-empleado.component.html',
  styleUrls: ['./c-empleado.component.css']
})
export class CEmpleadoComponent implements OnInit {

  constructor(
    public empleadoService:EmpleadoService
  ) { }

  ngOnInit() {
    this.obtenerGenero();
    this.obtenerEstadoCivil();
    this.obtenerSucursal();
    this.obtenerStatusEmpleado();
  }

  guardarEntidad(entidadForm: NgForm) {
    if (entidadForm.valid) {
        // Nuevo
        this.empleadoService.insertar_empleado(entidadForm.value)        
        .subscribe(data => {
          if(this.empleadoService.errorMessage){
            this.myAlertTop();
          }
          else{
            //location.reload();
          }
        });      
    }
  }  

  /* prueba(ev){
    let sucursal = this.empleadoService.sucursales.filter(rowData => {
      if(rowData["IdSucursal"] == this.empleadoService.selectEntidad.IdSucursal)
        return true;
    })
    console.log(sucursal);
    this.obtnerDepartamento(sucursal[0]["IdEmpresa"]);
    //alert("Hola");
  } */

  obtenerGenero(){
    this.empleadoService.cargar_genero()
    .subscribe(data => {
      this.empleadoService.generos = data;
    });
  }

  obtenerEstadoCivil(){
    this.empleadoService.cargar_estadocivil()
    .subscribe(data => {
      this.empleadoService.estadosciviles = data;
    });
  }

  obtenerSucursal(){
    this.empleadoService.cargar_sucursal()
    .subscribe(data => {
      this.empleadoService.sucursales = data;
    });
  }

  obtenerDepartamento(){
    this.empleadoService.selectEntidad.IdDepartamento = null;
    let sucursal = this.empleadoService.sucursales.filter(rowData => {
      if(rowData["IdSucursal"] == this.empleadoService.selectEntidad.IdSucursal)
        return true;
    })
    this.empleadoService.cargar_departamento(sucursal[0]["IdEmpresa"])
    .subscribe(data => {
      this.empleadoService.departamentos = data;
    });
  }

  obtenerPuesto(){
    this.empleadoService.selectEntidad.IdPuesto = null;
    this.empleadoService.cargar_puesto(this.empleadoService.selectEntidad.IdDepartamento)
    .subscribe(data => {
      this.empleadoService.puestos = data;
    });
  }

  obtenerStatusEmpleado(){
    this.empleadoService.cargar_statusempleado()
    .subscribe(data => {
      this.empleadoService.statusempleados = data;
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
