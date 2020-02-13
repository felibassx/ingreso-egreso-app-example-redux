import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { AuthService } from './auth.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {


  constructor( private _authService: AuthService ) {}

  canActivate() {

    const autenticado = this._authService.isAuth();
    return autenticado;
    
  }

  canLoad() {
    return this._authService.isAuth()
      .pipe(
        take(1)
      );
  }

}
