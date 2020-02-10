import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {


  constructor( private _authService: AuthService ) {}

  canActivate() {

    const autenticado = this._authService.isAuth();
    return autenticado;
    
  }

}
