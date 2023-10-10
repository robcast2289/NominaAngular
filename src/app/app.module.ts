import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxEditorModule } from 'ngx-editor';
import { AngularEditorModule } from '@kolkov/angular-editor';


import * as $ from 'jquery';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
//import { ProyectosComponent } from './components/catalogos/proyectos/proyectos.component';
//import { CuProyModalComponent } from './components/catalogos/proyectos/cu-proy-modal/cu-proy-modal.component';
//import { AccesosComponent } from './components/administracion/accesos/accesos.component';
//import { CuAccesModalComponent } from './components/administracion/accesos/cu-acces-modal/cu-acces-modal.component';
//import { RolesComponent } from './components/administracion/roles/roles.component';

import { Error404notFoundComponent } from './components/error404not-found/error404not-found.component';
import { Error403forbiddenComponent } from './components/error403forbidden/error403forbidden.component';

import { ModuloComponent } from './components/Seguridad/modulo/modulo.component';
import { CuModuloComponent } from './components/Seguridad/modulo/cu-modulo/cu-modulo.component';
import { MenusComponent } from './components/Seguridad/menus/menus.component';
import { CuMenuComponent } from './components/Seguridad/menus/cu-menu/cu-menu.component';
import { OpcionComponent } from './components/Seguridad/opcion/opcion.component';
import { CuOpcionComponent } from './components/Seguridad/opcion/cu-opcion/cu-opcion.component';
import { RolesComponent } from './components/Seguridad/roles/roles.component';
import { CuRolesComponent } from './components/Seguridad/roles/cu-roles/cu-roles.component';
import { RolesOpcionComponent } from './components/Seguridad/roles-opcion/roles-opcion.component';
import { CuRolesOpcionComponent } from './components/Seguridad/roles-opcion/cu-roles-opcion/cu-roles-opcion.component';
import { UsuarioTableComponent } from './components/Seguridad/usuario-table/usuario-table.component';
import { UsuarioRoleComponent } from './components/Seguridad/usuario-role/usuario-role.component';
import { EmpresaComponent } from './components/Seguridad/empresa/empresa.component';
import { SucursalComponent } from './components/Seguridad/sucursal/sucursal.component';
import { GeneroComponent } from './components/Seguridad/genero/genero.component';
import { StatusUsuarioComponent } from './components/Seguridad/status-usuario/status-usuario.component';
import { CuUsuarioTableComponent } from './components/Seguridad/usuario-table/cu-usuario-table/cu-usuario-table.component';
import { CuUsuarioRoleComponent } from './components/Seguridad/usuario-role/cu-usuario-role/cu-usuario-role.component';
import { CuSucursalComponent } from './components/Seguridad/sucursal/cu-sucursal/cu-sucursal.component';
import { CuStatusUsuarioComponent } from './components/Seguridad/status-usuario/cu-status-usuario/cu-status-usuario.component';
import { CuGeneroComponent } from './components/Seguridad/genero/cu-genero/cu-genero.component';
import { CuEmpresaComponent } from './components/Seguridad/empresa/cu-empresa/cu-empresa.component';
import { PerfilComponent } from './components/Seguridad/perfil/perfil.component';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { CuUsuarioPreguntaComponent } from './components/Seguridad/usuario-role/cu-usuario-pregunta/cu-usuario-pregunta.component';

import { DepartamentoComponent } from './components/rrhh/departamento/departamento.component';
import { CuDepartamentoComponent } from './components/rrhh/departamento/cu-departamento/cu-departamento.component';
import { PuestoComponent } from './components/rrhh/puesto/puesto.component';
import { CuPuestoComponent } from './components/rrhh/puesto/cu-puesto/cu-puesto.component';
import { EstadoCivilComponent } from './components/rrhh/estado-civil/estado-civil.component';
import { CuEstadoCivilComponent } from './components/rrhh/estado-civil/cu-estado-civil/cu-estado-civil.component';
import { TipoDocumentoComponent } from './components/rrhh/tipo-documento/tipo-documento.component';
import { CuTipoDocumentoComponent } from './components/rrhh/tipo-documento/cu-tipo-documento/cu-tipo-documento.component';

import { EmpleadoComponent } from './components/nomina/empleado/empleado.component';
import { PeriodoComponent } from './components/nomina/periodo/periodo.component';
import { CuPeriodoComponent } from './components/nomina/periodo/cu-periodo/cu-periodo.component';
import { StatusEmpleadoComponent } from './components/nomina/status-empleado/status-empleado.component';
import { CuStatusEmpleadoComponent } from './components/nomina/status-empleado/cu-status-empleado/cu-status-empleado.component';
import { FlujoStatusEmpleadoComponent } from './components/nomina/flujo-status-empleado/flujo-status-empleado.component';
import { CuFlujoStatusEmpleadoComponent } from './components/nomina/flujo-status-empleado/cu-flujo-status-empleado/cu-flujo-status-empleado.component';
import { InasistenciaComponent } from './components/nomina/inasistencia/inasistencia.component';
import { CuInasistenciaComponent } from './components/nomina/inasistencia/cu-inasistencia/cu-inasistencia.component';

import { BancoComponent } from './components/banco/banco/banco.component';
import { CuBancoComponent } from './components/banco/banco/cu-banco/cu-banco.component';
import { BitacoraAccesoComponent } from './components/Seguridad/bitacora-acceso/bitacora-acceso.component';
import { CEmpleadoComponent } from './components/nomina/empleado/c-empleado/c-empleado.component';
import { UEmpleadoComponent } from './components/nomina/empleado/u-empleado/u-empleado.component';
import { PlanillaComponent } from './components/nomina/planilla/planilla.component';
import { CuPlanillaComponent } from './components/nomina/planilla/cu-planilla/cu-planilla.component';
import { PlanillaDetalleComponent } from './components/nomina/planilla-detalle/planilla-detalle.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SidebarComponent,
    Error404notFoundComponent,
    Error403forbiddenComponent,
    ModuloComponent,
    CuModuloComponent,
    MenusComponent,
    CuMenuComponent,
    OpcionComponent,
    CuOpcionComponent,
    RolesComponent,
    CuRolesComponent,
    RolesOpcionComponent,
    CuRolesOpcionComponent,
    UsuarioTableComponent,
    UsuarioRoleComponent,
    EmpresaComponent,
    SucursalComponent,
    GeneroComponent,
    StatusUsuarioComponent,
    CuUsuarioTableComponent,
    CuUsuarioRoleComponent,
    CuSucursalComponent,
    CuStatusUsuarioComponent,
    CuGeneroComponent,
    CuEmpresaComponent,
    PerfilComponent,
    ForgotPasswordComponent,
    CuUsuarioPreguntaComponent,
    BancoComponent,
    CuBancoComponent,
    DepartamentoComponent,
    CuDepartamentoComponent,
    PuestoComponent,
    CuPuestoComponent,
    EstadoCivilComponent,
    CuEstadoCivilComponent,
    TipoDocumentoComponent,
    CuTipoDocumentoComponent,
    PeriodoComponent,
    CuPeriodoComponent,
    StatusEmpleadoComponent,
    CuStatusEmpleadoComponent,
    FlujoStatusEmpleadoComponent,
    CuFlujoStatusEmpleadoComponent,
    InasistenciaComponent,
    CuInasistenciaComponent,
    EmpleadoComponent,
    BitacoraAccesoComponent,
    CEmpleadoComponent,
    UEmpleadoComponent,
    PlanillaComponent,
    CuPlanillaComponent,
    PlanillaDetalleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    NgxEditorModule,
    AngularEditorModule,
  ],
  providers: [DeviceDetectorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
