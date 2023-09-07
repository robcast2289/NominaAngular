import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AuthGuard } from './components/login/auth.guard';
import { Error404notFoundComponent } from './components/error404not-found/error404not-found.component';

/* import { ProyectosComponent } from './components/catalogos/proyectos/proyectos.component';
import { AccesosComponent } from './components/administracion/accesos/accesos.component';
import { RolesComponent } from './components/administracion/roles/roles.component';
 */

import { ModuloComponent } from './components/Seguridad/modulo/modulo.component'
import { MenusComponent } from './components/Seguridad/menus/menus.component'
import { OpcionComponent } from './components/Seguridad/opcion/opcion.component'
import { RolesComponent } from './components/Seguridad/roles/roles.component'
import { RolesOpcionComponent } from './components/Seguridad/roles-opcion/roles-opcion.component'

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
      /* {
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
      }, */
      {
        path: 'seguridad/generales/modulos',
        component: ModuloComponent,
      },
      {
        path: 'seguridad/generales/menus',
        component: MenusComponent,
      },
      {
        path: 'seguridad/generales/opciones',
        component: OpcionComponent,
      },
      {
        path: 'seguridad/generales/roles',
        component: RolesComponent,
      },
      {
        path: 'seguridad/generales/roles/:IdRole',
        component: RolesOpcionComponent,
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
