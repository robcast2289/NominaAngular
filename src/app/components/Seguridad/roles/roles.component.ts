import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  id:number;
  constructor(private _Activatedroute:ActivatedRoute) { }

  ngOnInit() {
    this._Activatedroute.params.subscribe(params => { 
      this.id = params['IdRole']; 
  });
  }

}
