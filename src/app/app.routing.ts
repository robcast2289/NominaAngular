import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AuthGuard } from './components/login/auth.guard';
import { ProyectosComponent } from './components/catalogos/proyectos/proyectos.component';
import { Error404notFoundComponent } from './components/error404not-found/error404not-found.component';
import { AccesosComponent } from './components/administracion/accesos/accesos.component';
import { RolesComponent } from './components/administracion/roles/roles.component';
import { ModuloComponent } from './components/Seguridad/modulo/modulo.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '404notfound',
    component: Error404notFoundComponent
  },
  {
    path: '',
    component: SidebarComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'proyectos',
        component: ProyectosComponent
      },
      {
        path: 'accesos',
        component: AccesosComponent
      },
      {
        path: 'roles',
        component: RolesComponent
      },
      {
        path: 'modulos',
        component: ModuloComponent,
      }
    ]
  },
  {
    path: '**',
    redirectTo: '404notfound'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }