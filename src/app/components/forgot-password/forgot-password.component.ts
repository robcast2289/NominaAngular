import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  fase:number;
  recover = {
    email: '',
  };

  preguntas = [];

  newPassword = {
    Password:'',
    ConfirmPassword:''
  }

  errorRecover = {
    mensaje: ''
  };

  constructor(
    public authService: AuthService, 
    private router: Router, 
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.fase = 1;
  }

  onSubmit(e) {
    this.spinner.show();
    this.authService.recoverUser(e.value.email)
    .pipe(
      map(e=>{
        console.log(e);
        this.errorRecover.mensaje = "";
        let vars = Object.entries(e);
        vars.forEach(element => {
          this.preguntas.push(element[1]);
        });
        this.fase=2;
      }),
      catchError(data => {
      this.errorRecover.mensaje = data.error.mensaje;
      return of(data).pipe(
        map(val => data.error)
      );
    }))
    .subscribe(data => {
      //console.log(data);
      this.spinner.hide();
      /* this.errorRecover.mensaje = "";
      this.fase=2; */
      /* if (typeof data.error !== 'undefined' && !data.error) {
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
        this.errorRecover.mensaje = data.mensaje;
      } else {
        console.log(data);
      } */
    });
  }

  onSubmitQuestion(form: NgForm) {
    console.log(form.value);
    this.spinner.show();
    this.authService.validQuestions(form.value,this.recover.email)
    .pipe(
      map(e=>{
        console.log(e);
        this.errorRecover.mensaje = "";
        
        this.fase=3;
      }),
      catchError(data => {
      this.errorRecover.mensaje = data.error.mensaje;
      this.preguntas.forEach(element => {
        element['Respuesta'] = "";
      });
      return of(data).pipe(
        map(val => data.error)
      );
    }))
    .subscribe(data => {
      this.spinner.hide();
    });
  }

  onSubmitNewPassword(form: NgForm) {
    console.log(form.value);
    this.spinner.show();
    this.authService.changePassword(form.value,this.recover.email)
    .pipe(
      map(e=>{
        console.log(e);
        this.errorRecover.mensaje = "";
        
        this.authService.isLoggedIn = true;
        this.authService.cargar_credenciales(
          e["user"].Nombre + ' ' + e["user"].Apellido,
          e["user"].CorreoElectronico,
          e["token"],
          e["expires_at"],
          e["user"].IdUsuario,
          e["user"].Fotografia
        );
        this.authService.guardar_storage();

        const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : 'home';
        this.router.navigate([redirect]);
      }),
      catchError(data => {
      this.errorRecover.mensaje = data.error.mensaje;
      this.preguntas.forEach(element => {
        element['Respuesta'] = "";
      });
      return of(data).pipe(
        map(val => data.error)
      );
    }))
    .subscribe(data => {
      this.spinner.hide();
    });
  }

}
