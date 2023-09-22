import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

declare var require: any;
const $ = require('jquery');

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(public menuService: MenuService,
              public authService: AuthService,
              private router: Router,
              private spinner: NgxSpinnerService) {
    this.spinner.show();
    this.menuService.titleActive = 'Sistema Nomina';
    this.menuService.menu_get(this.authService.credenciales.userId, this.authService.credenciales.accessToken)
    .pipe(catchError(data => {
      return of(data).pipe(
        map(val => data.error)
      );
    }))
    .subscribe(data => {
      this.spinner.hide();
      if (typeof data.error !== 'undefined' && !data.error) {
        const actualUrl = this.router.url;
        let menuTree = data.opciones;
        menuTree.forEach(modulo => {
          modulo["submenu"].forEach(menu => {
            menu["submenu"].forEach(opcion => {              
              if(actualUrl.includes(opcion["Ruta"])){
                modulo["select"] = true;
                menu["select"] = true;
                opcion["select"] = true;
              }
            });
          });
        });
        this.menuService.menu_all = data.opciones;
      } else {
        this.menuService.menu_all = [];
        console.log(data.mensaje);
      }
    });
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  async ngOnInit() {
    await this.authService.tieneAccesoOpcion(this.router.url)
    .subscribe(obs => {
        if(obs == false){
          this.router.navigate(["403forbidden"]);
        }
      });
  }

  sidebarCollapse() {
    $('#sidebar').toggleClass('active');
    $('#sidebarCollapse').toggleClass('active');
  }

  changeOpt(nameOpt: string) {
    this.menuService.titleActive = nameOpt;
  }

}
