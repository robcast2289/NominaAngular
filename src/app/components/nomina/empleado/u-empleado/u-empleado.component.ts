import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuService } from '../../../../services/menu.service';
import { EmpleadoService } from '../../../../services/nomina/empleado.service';

@Component({
  selector: 'app-u-empleado',
  templateUrl: './u-empleado.component.html',
  styleUrls: ['./u-empleado.component.css']
})
export class UEmpleadoComponent implements OnInit {
  id:number;
  dataEmpleado:any;

  entidadDocumentos = {
    IdTipoDocumento: null,
    NoDocumento: null,
  
  }
  entidadCuentaBancaria = {
    IdBanco: null,
    NumeroDeCuenta: null,
  }

  constructor(
    private _Activatedroute:ActivatedRoute,
    private location:Location,
    public empleadoService:EmpleadoService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private menuService: MenuService
  ) { 
    this.menuService.titleActive = 'Empleados';
  }

  ngOnInit() {
    this.obtenerGenero();
    this.obtenerEstadoCivil();
    this.obtenerSucursal();
    this.obtenerStatusEmpleado();
    this.obtenerTipoDocumento();
    this.obtenerBanco();
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
      this.dataEmpleado = data;
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
      this.obtenerCuentaBancariaEmpleado();
    });
  }

  guardarEntidad(entidadForm: NgForm) {
    if (entidadForm.valid) {
        // Nuevo
        this.empleadoService.actualizar_empleado(entidadForm.value)        
        .subscribe(data => {
          if(this.empleadoService.errorMessage){
            this.myAlertTop();
          }
          else{
            location.reload();
            //this.router.navigate(["nomina/empleados/"+data]);
          }
        });      
    }
  }  

  back(){
    //this.location.back();
    this.router.navigate(["nomina/empleados"]);
  }

  clearDocument(){
    this.entidadDocumentos = {
      IdTipoDocumento: null,
      NoDocumento: null,
    }
  }

  saveDocument(){
    const params = {
      IdTipoDocumento: this.entidadDocumentos.IdTipoDocumento,
      IdPersona: this.empleadoService.selectEntidad.IdPersona,
      NoDocumento: this.entidadDocumentos.NoDocumento
    }
    this.empleadoService.insertar_documentopersona(params)
    .subscribe(data => {
      this.obtenerDocumentosPersona();
      this.clearDocument();
    });
  }

  deleteDocument(idtipodoc){
    this.empleadoService.eliminar_documentopersona(idtipodoc,this.empleadoService.selectEntidad.IdPersona)
    .subscribe(data => {
      if(this.empleadoService.errorMessage){
        this.myAlertTop();
      }
      else{
        this.obtenerDocumentosPersona();
      }
    });
  
  }


  clearCuentaBancaria(){
    this.entidadCuentaBancaria = {
      IdBanco: null,
      NumeroDeCuenta: null,
    }
  }
  saveCuentaBancaria(){
    const params = {
      IdEmpleado: this.empleadoService.selectEntidad.IdEmpleado,
      IdBanco: this.entidadCuentaBancaria.IdBanco,
      NumeroDeCuenta: this.entidadCuentaBancaria.NumeroDeCuenta
    }
    this.empleadoService.insertar_cuentabancariaempleado(params)
    .subscribe(data => {
      this.obtenerCuentaBancariaEmpleado();
      this.clearCuentaBancaria();
    });
  }

  deleteCuentaBancaria(idcuenta){
    this.empleadoService.eliminar_cuentabancariaempleado(idcuenta)
    .subscribe(data => {
      if(this.empleadoService.errorMessage){
        this.myAlertTop();
      }
      else{
        this.obtenerCuentaBancariaEmpleado();
      }
    });
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

  obtenerTipoDocumento(){
    this.empleadoService.cargar_tipodocumento()
    .subscribe(data => {
      this.empleadoService.tipodocumentos = data;
    });
  }

  obtenerCuentaBancariaEmpleado(){
    this.empleadoService.cargar_cuentabancariaempleado(this.empleadoService.selectEntidad.IdEmpleado)
    .subscribe(data => {
      this.empleadoService.cuentasbancarias = data;
    });
  }

  obtenerBanco(){
    this.empleadoService.cargar_banco()
    .subscribe(data => {
      this.empleadoService.bancos = data;
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
