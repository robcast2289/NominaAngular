import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { tap, delay, map, catchError } from 'rxjs/operators';
import { of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {

  constructor(private autService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean> {
    const url: string = state.url;
    if(this.checkLogin(url)){
      return this.autService.tieneAccesoOpcion(url)
      .pipe(
        map(e => {
          if (e) {
            return true;
          } else {
            this.router.navigate(['403forbidden']);
            return false;
          }
        }),
        catchError(data => {
          this.router.navigate(['home']);
          return of(false);
        })
      );
      
      //return true;
    }
    else{
      return of(false);
    }
    
      //return this.checkLogin(url);
  }

  checkLogin(url) {
    if (this.autService.isLoggedIn && this.autService.credenciales.expiresIn) {
      if(new Date(this.autService.credenciales.expiresIn) > new Date()){
        return true;
      }
      else{
        this.autService.logout();
      }
    }

    this.autService.cargar_storage();
    if (this.autService.credenciales.userId && this.autService.credenciales.expiresIn) {
      if(new Date(this.autService.credenciales.expiresIn) > new Date()){
        this.autService.isLoggedIn = true;
        return true;
      }
      else{
        this.autService.logout();
      }
      
    }

    this.autService.redirectUrl = url;

    this.router.navigate(['login']);
    return false;
  }

}
