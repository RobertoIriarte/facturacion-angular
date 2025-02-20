import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../service/login.service';	
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(): boolean {

    const token = localStorage.getItem('token');
    if ( !token ) {
      this.router.navigate(['/login']); 
      return false; // Usuario no autenticado, redirige al componente de login
    } else {// Usuario autenticado, permite el acceso a la ruta
      // Validamos si token es válido
      let payload = JSON.parse(atob(token.split(".")[1]));
      let now = new Date().getTime() / 1000;
      if(payload.exp < now){
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
          return false;
      }
      
      return true;
    }
  }
};
