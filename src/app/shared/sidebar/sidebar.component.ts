import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IngresoEgresoService } from '../../ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {

  nombreUsuario: string;
  subscription: Subscription = new Subscription();

  constructor( 
          public _authService: AuthService, 
          public store: Store<AppState>, 
          public ingresoEgresoService: IngresoEgresoService 
          ) { }

  ngOnInit() {
    this.subscription = this.store.select('auth')
    .pipe(
      filter(auth => auth.user != null) // para controlar que no pasen datos nulos
    )
      .subscribe( auth => this.nombreUsuario = auth.user.nombre );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this._authService.logout();
    this.ingresoEgresoService.cancelarSubscriptions();
  }

}
