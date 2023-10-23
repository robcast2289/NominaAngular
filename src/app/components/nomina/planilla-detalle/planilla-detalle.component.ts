import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuService } from '../../../services/menu.service';
import { PlanillacabeceraService } from '../../../services/nomina/planillacabecera.service';
import { TablaBase } from 'src/app/services/base/tabla.model';

@Component({
  selector: 'app-planilla-detalle',
  templateUrl: './planilla-detalle.component.html',
  styleUrls: ['./planilla-detalle.component.css']
})
export class PlanillaDetalleComponent extends TablaBase implements OnInit {
  anio:number;
  mes:number;
  planilla:any;

  constructor(
    private _Activatedroute:ActivatedRoute,
    private location:Location,
    public planillacabeceraService:PlanillacabeceraService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private menuService: MenuService
  ) { 
    super();
    this.menuService.titleActive = 'Planilla';
  }

  ngOnInit() {
    let id:string;
    this._Activatedroute.params.subscribe(params => { 
      id = params['IdPlanilla']; 
      this.anio = Number(id.substring(0,4));
      this.mes = Number(id.substring(4));
      this.obtenerPlanillaCabecera(this.anio,this.mes);
      //this.obtenerRolesOpciones(this.id)
    });
  }

  obtenerPlanillaCabecera(anio,mes){
    this.spinner.show();
    this.planillacabeceraService.cargar_planillacabecera_id(anio,mes)
    .subscribe(data => {
      this.spinner.hide();
      this.planilla = data;     
      this.planilla["FechaHoraCalculada"] = this.planilla["FechaHoraCalculada"] != null ? this.formatDate(new Date(this.planilla["FechaHoraCalculada"]),false) : this.planilla["FechaHoraCalculada"];
      this.planilla["FechaHoraProcesada"] = this.planilla["FechaHoraProcesada"] != null ? this.formatDate(new Date(this.planilla["FechaHoraProcesada"]),false) : this.planilla["FechaHoraProcesada"];
      this.planilla["FechaInicio"] = this.formatDate(new Date(this.planilla["FechaInicio"]+" 00:00:00"),false);
      this.planilla["FechaFin"] = this.formatDate(new Date(this.planilla["FechaFin"]+" 00:00:00"),false);
      this.planilla["MesName"] = this.planillacabeceraService.meses.find(x => x.value == this.planilla["Mes"]).Name;

      this.obtenerPlanillaDetalle(anio,mes);
    });
  }

  obtenerPlanillaDetalle(anio,mes){
    this.spinner.show();
    this.planillacabeceraService.cargar_planilladetalle(anio,mes)
    .subscribe(data => {
      this.spinner.hide();
      this.entidad = data;      
      this.entidadTable = data;
    });
  }

  back(){
    this.location.back();
  }

  crearPlanilla(){
    this.spinner.show();
    this.planillacabeceraService.resetPlanilla(this.planilla["Anio"],this.planilla["Mes"])
    .subscribe(data => {
      this.spinner.hide();
      location.reload();
    });
  }

  calcularPlanilla(){
    this.spinner.show();
    this.planillacabeceraService.calcularPlanilla(this.planilla["Anio"],this.planilla["Mes"])
    .subscribe(data => {
      this.spinner.hide();
      location.reload();
    });
  }

  pagarPlanilla(){
    this.spinner.show();
    this.planillacabeceraService.pagarPlanilla(this.planilla["Anio"],this.planilla["Mes"])
    .subscribe(data => {
      this.spinner.hide();
      location.reload();
    });
  }

}
