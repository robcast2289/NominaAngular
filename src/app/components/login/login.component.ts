import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login = {
    email: '',
    password: ''
  };

  errorLogin = {
    mensaje: ''
  };

  constructor(public authService: AuthService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    if (!this.authService.isLoggedIn) {
      this.authService.cargar_storage();
      if (this.authService.credenciales.userId) {
        this.authService.isLoggedIn = true;
        const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : 'home';
        this.router.navigate([redirect]);
      }
    }
  }

  onSubmit(e) {
    this.spinner.show();
    this.authService.login(e.value.email, e.value.password)
    .pipe(catchError(data => {
      this.login.password = "";
      this.errorLogin.mensaje = "Error desconocido";
      return of(data).pipe(
        map(val => data.error)
      );
    }))
    .subscribe(data => {
      this.spinner.hide();
      if (typeof data.error !== 'undefined' && !data.error) {
        this.authService.isLoggedIn = true;
        this.authService.cargar_credenciales(
          data.user.Nombre + ' ' + data.user.Apellido,
          data.user.CorreoElectronico,
          data.token,
          data.expires_at,
          data.user.IdUsuario,
          data.user.Fotografia
        );
        this.authService.guardar_storage();
        // this.authService.userId = data["id_user"];

        const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : 'home';
        this.router.navigate([redirect]);
      } else if (typeof data.error !== 'undefined' && data.error) {
        this.errorLogin.mensaje = data.mensaje;
      } else {
        console.log(data);
      }
    });
  }

}
