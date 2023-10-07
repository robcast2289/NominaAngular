import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AuthGuard } from './components/login/auth.guard';
import { Error404notFoundComponent } from './components/error404not-found/error404not-found.component';
import { Error403forbiddenComponent } from './components/error403forbidden/error403forbidden.component';
import { PerfilComponent } from './components/Seguridad/perfil/perfil.component'

/* import { ProyectosComponent } from './components/catalogos/proyectos/proyectos.component';
import { AccesosComponent } from './components/administracion/accesos/accesos.component';
import { RolesComponent } from './components/administracion/roles/roles.component';
 */

import { ModuloComponent } from './components/Seguridad/modulo/modulo.component'
import { MenusComponent } from './components/Seguridad/menus/menus.component'
import { OpcionComponent } from './components/Seguridad/opcion/opcion.component'
import { RolesComponent } from './components/Seguridad/roles/roles.component'
import { RolesOpcionComponent } from './components/Seguridad/roles-opcion/roles-opcion.component'
import { UsuarioTableComponent } from './components/Seguridad/usuario-table/usuario-table.component'
import { UsuarioRoleComponent } from './components/Seguridad/usuario-role/usuario-role.component';
import { EmpresaComponent } from './components/Seguridad/empresa/empresa.component';
import { SucursalComponent } from './components/Seguridad/sucursal/sucursal.component';
import { GeneroComponent } from './components/Seguridad/genero/genero.component';
import { StatusUsuarioComponent } from './components/Seguridad/status-usuario/status-usuario.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

import { EmpleadoComponent } from './components/nomina/empleado/empleado.component';
import { CEmpleadoComponent } from './components/nomina/empleado/c-empleado/c-empleado.component';
import { UEmpleadoComponent } from './components/nomina/empleado/u-empleado/u-empleado.component';
import { PeriodoComponent } from './components/nomina/periodo/periodo.component';
import { StatusEmpleadoComponent } from './components/nomina/status-empleado/status-empleado.component';
import { FlujoStatusEmpleadoComponent } from './components/nomina/flujo-status-empleado/flujo-status-empleado.component';
import { InasistenciaComponent } from './components/nomina/inasistencia/inasistencia.component';

import { DepartamentoComponent } from './components/rrhh/departamento/departamento.component';
import { PuestoComponent } from './components/rrhh/puesto/puesto.component';
import { EstadoCivilComponent } from './components/rrhh/estado-civil/estado-civil.component';
import { TipoDocumentoComponent } from './components/rrhh/tipo-documento/tipo-documento.component';

import { BancoComponent } from './components/banco/banco/banco.component';
import { BitacoraAccesoComponent } from './components/Seguridad/bitacora-acceso/bitacora-acceso.component';

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
    path: 'recover-pass',
    component: ForgotPasswordComponent
  },
  {
    path: '404notfound',
    component: Error404notFoundComponent
  },
  {
    path: '403forbidden',
    component: Error403forbiddenComponent
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
        path: 'seguridad/perfil',
        component: PerfilComponent,
      },
      // MODULO CONFIGURACION
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
      },
      {
        path: 'seguridad/generales/usuarios',
        component: UsuarioTableComponent,
      },
      {
        path: 'seguridad/generales/usuarios/:IdUsuario',
        component: UsuarioRoleComponent,
      },
      {
        path: 'seguridad/generales/empresas',
        component: EmpresaComponent,
      },
      {
        path: 'seguridad/generales/sucursal',
        component: SucursalComponent,
      },
      {
        path: 'seguridad/generales/genero',
        component: GeneroComponent,
      },
      {
        path: 'seguridad/generales/status-usuario',
        component: StatusUsuarioComponent,
      },
      {
        path: 'seguridad/generales/bitacora-acceso',
        component: BitacoraAccesoComponent,
      },
      // MODULO NOMINA
      {
        path: 'nomina/empleados',
        component: EmpleadoComponent,
      },
      {
        path: 'nomina/empleados/nuevo',
        component: CEmpleadoComponent,
      },
      {
        path: 'nomina/empleados/:IdEmpleado',
        component: UEmpleadoComponent,
      },
      {
        path: 'nomina/periodos',
        component: PeriodoComponent,
      },
      {
        path: 'nomina/inasistencias',
        component: InasistenciaComponent,
      },
      {
        path: 'nomina/status-empleado',
        component: StatusEmpleadoComponent,
      },
      {
        path: 'nomina/flujo-status-empleado',
        component: FlujoStatusEmpleadoComponent,
      },
      // MODULO RRHH
      {
        path: 'rrhh/departamentos',
        component: DepartamentoComponent,
      },
      {
        path: 'rrhh/puestos',
        component: PuestoComponent,
      },
      {
        path: 'rrhh/estado-civil',
        component: EstadoCivilComponent,
      },
      {
        path: 'rrhh/tipo-documento',
        component: TipoDocumentoComponent,
      },
      // MODULO BANCOS
      {
        path: 'banco/bancos',
        component: BancoComponent,
      },
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
