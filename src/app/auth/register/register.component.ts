import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  cargando: boolean = false;
  subscription: Subscription;

  constructor( 
              public _authService: AuthService,
              public store: Store<AppState>
              ) { }

  ngOnInit() {
    this.subscription = this.store.select('ui')
      .subscribe(ui => this.cargando = ui.isLoading );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  onSubmit( data: any ) {
    console.log(data);

    this._authService.crearUsuario(data.nombre, data.email, data.password);

  }

}
