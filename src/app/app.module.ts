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
import { ProyectosComponent } from './components/catalogos/proyectos/proyectos.component';
import { CuProyModalComponent } from './components/catalogos/proyectos/cu-proy-modal/cu-proy-modal.component';
import { AccesosComponent } from './components/administracion/accesos/accesos.component';
import { CuAccesModalComponent } from './components/administracion/accesos/cu-acces-modal/cu-acces-modal.component';
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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SidebarComponent,
    ProyectosComponent,
    Error404notFoundComponent,
    Error403forbiddenComponent,
    CuProyModalComponent,
    AccesosComponent,
    CuAccesModalComponent,
    RolesComponent,
    ModuloComponent,
    CuModuloComponent,
    MenusComponent,
    CuMenuComponent,
    OpcionComponent,
    CuOpcionComponent,
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
    AngularEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
