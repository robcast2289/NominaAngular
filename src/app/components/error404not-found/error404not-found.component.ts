import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error404not-found',
  templateUrl: './error404not-found.component.html',
  styleUrls: ['./error404not-found.component.css']
})
export class Error404notFoundComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
