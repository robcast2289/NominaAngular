import { Component, OnInit } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';

import { MenuService } from '../../../services/menu.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService,
    //private rolesService: RolesService,
    private menuService: MenuService) {
      this.menuService.titleActive = 'Perfil';
     }

  ngOnInit() {
  }

}
