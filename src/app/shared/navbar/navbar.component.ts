import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {

  nombreUsuario: string;
  subscription: Subscription = new Subscription();

  constructor( public store: Store<AppState>) { }

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

}
