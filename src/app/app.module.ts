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
import { Error404notFoundComponent } from './components/error404not-found/error404not-found.component';
import { CuProyModalComponent } from './components/catalogos/proyectos/cu-proy-modal/cu-proy-modal.component';
import { AccesosComponent } from './components/administracion/accesos/accesos.component';
import { CuAccesModalComponent } from './components/administracion/accesos/cu-acces-modal/cu-acces-modal.component';
import { RolesComponent } from './components/administracion/roles/roles.component';
import { ModuloComponent } from './components/Seguridad/modulo/modulo.component';
import { CuModuloComponent } from './components/Seguridad/modulo/cu-modulo/cu-modulo.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SidebarComponent,
    ProyectosComponent,
    Error404notFoundComponent,
    CuProyModalComponent,
    AccesosComponent,
    CuAccesModalComponent,
    RolesComponent,
    ModuloComponent,
    CuModuloComponent
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
