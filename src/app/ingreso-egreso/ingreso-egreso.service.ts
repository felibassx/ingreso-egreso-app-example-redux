import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from './ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter, map } from 'rxjs/operators';
import { SetItemsAction, UnsetItemsAction } from './ingreso-egreso.actions';
import { Subscription } from 'rxjs';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  ingresoEgresoListenerSubcription: Subscription = new Subscription();
  ingresoEgresoItemsSubcription: Subscription = new Subscription();

  constructor( 
              private afDB: AngularFirestore, 
              public authService: AuthService,
              private store: Store<AppState>
            ) { }

  initIngresoEgresoListener() {
    
    this.ingresoEgresoListenerSubcription = this.store.select('auth')
      .pipe(
        // con el operador filter le digo que si el usuario es distinto de null entonces pasara al subscribe 
        filter(auth => auth.user != null) 
      )
      .subscribe(auth => {
        this.ingresoEgresoItems(auth.user.uid);
        
      });
  }

  private ingresoEgresoItems( uid: string ) {
    this.ingresoEgresoItemsSubcription = this.afDB.collection(`${ uid }/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map(
          docData => {
            return docData.map( (doc: any) => {
              return {
                uid: doc.payload.doc.id,
                ...doc.payload.doc.data()
              };
            });
          }
        )
      )
      .subscribe( (coleccion: any[]) => {
        this.store.dispatch( new SetItemsAction(coleccion) );
      });
      
  }

  cancelarSubscriptions() {
    this.ingresoEgresoItemsSubcription.unsubscribe();
    this.ingresoEgresoListenerSubcription.unsubscribe();
    this.store.dispatch( new UnsetItemsAction() );
  }

  crearIngresoEgreso( ingresoEgreso: IngresoEgreso): Promise<any> {

    const user = this.authService.getUsuario();

    return this.afDB.doc(`${user.uid}/ingresos-egresos`)
      .collection('items').add({...ingresoEgreso});
    
  }

  borrarIngresoEgreso( uid: string ): Promise<void> {
    const user = this.authService.getUsuario();

    return this.afDB.doc(`${ user.uid }/ingresos-egresos/items/${ uid }`)
      .delete();
  }

}
