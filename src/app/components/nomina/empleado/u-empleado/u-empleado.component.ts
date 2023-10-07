import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

import { EmpleadoService } from '../../../../services/nomina/empleado.service';

@Component({
  selector: 'app-u-empleado',
  templateUrl: './u-empleado.component.html',
  styleUrls: ['./u-empleado.component.css']
})
export class UEmpleadoComponent implements OnInit {
  id:number;

  constructor(
    private _Activatedroute:ActivatedRoute,
    private location:Location,
    public empleadoService:EmpleadoService,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.obtenerGenero();
    this.obtenerEstadoCivil();
    this.obtenerSucursal();
    this.obtenerStatusEmpleado();
    this._Activatedroute.params.subscribe(params => { 
      this.id = params['IdEmpleado']; 
      this.obtenerEmpleado(this.id);
      //this.obtenerRolesOpciones(this.id)
    });
  }

  obtenerEmpleado(id){
    this.spinner.show();
    this.empleadoService.cargar_empleado_id(id)
    .subscribe(data => {
      this.spinner.hide();
      //this.role = data;
      this.empleadoService.selectEntidad.IdEmpleado = data["IdEmpleado"];
      this.empleadoService.selectEntidad.IdPersona = data["IdPersona"];
      this.empleadoService.selectEntidad.Nombre = data["Nombre"];
      this.empleadoService.selectEntidad.Apellido = data["Apellido"];
      this.empleadoService.selectEntidad.FechaNacimiento = data["FechaNacimiento"];
      this.empleadoService.selectEntidad.IdGenero = data["IdGenero"];
      this.empleadoService.selectEntidad.IdEstadoCivil = data["IdEstadoCivil"];
      this.empleadoService.selectEntidad.Direccion = data["Direccion"];
      this.empleadoService.selectEntidad.Telefono = data["Telefono"];
      this.empleadoService.selectEntidad.CorreoElectronico = data["CorreoElectronico"];
      this.empleadoService.selectEntidad.IdSucursal = data["IdSucursal"];
      this.empleadoService.selectEntidad.IdDepartamento = data["IdDepartamento"];
      this.empleadoService.selectEntidad.IdPuesto = data["IdPuesto"];
      this.empleadoService.selectEntidad.FechaContratacion = data["FechaContratacion"];
      this.empleadoService.selectEntidad.IdStatusEmpleado = data["IdStatusEmpleado"];
      this.empleadoService.selectEntidad.IngresoSueldoBase = data["IngresoSueldoBase"];
      this.empleadoService.selectEntidad.IngresoBonificacionDecreto = data["IngresoBonificacionDecreto"];
      this.empleadoService.selectEntidad.IngresoOtrosIngresos = data["IngresoOtrosIngresos"];
      this.empleadoService.selectEntidad.DescuentoIgss = data["DescuentoIgss"];
      this.empleadoService.selectEntidad.DescuentoIsr = data["DescuentoIsr"];
      this.empleadoService.selectEntidad.DescuentoInasistencias = data["DescuentoInasistencias"];

      this.obtenerDepartamento(true);
      this.obtenerPuesto(true);
      this.obtenerDocumentosPersona()
    });
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
            this.router.navigate(["nomina/empleados/"+data]);
          }
        });      
    }
  }  

  back(){
    //this.location.back();
    this.router.navigate(["nomina/empleados"]);
  }

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

  obtenerDepartamento(init = false){
    if(init == false){
      this.empleadoService.selectEntidad.IdDepartamento = null;
    }
    let sucursal = this.empleadoService.sucursales.filter(rowData => {
      if(rowData["IdSucursal"] == this.empleadoService.selectEntidad.IdSucursal)
        return true;
    })
    this.empleadoService.cargar_departamento(sucursal[0]["IdEmpresa"])
    .subscribe(data => {
      this.empleadoService.departamentos = data;
    });
  }

  obtenerPuesto(init = false){
    if(init == false){
      this.empleadoService.selectEntidad.IdPuesto = null;
    }
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

  obtenerDocumentosPersona(){
    this.empleadoService.cargar_documentospersona(this.empleadoService.selectEntidad.IdPersona)
    .subscribe(data => {
      this.empleadoService.documentos = data;
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
