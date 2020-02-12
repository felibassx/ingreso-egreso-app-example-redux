import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../ingreso-egreso.model';

import { MultiDataSet, Label } from 'ng2-charts';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../../shared/ui.actions';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit, OnDestroy {

  loadingSubs: Subscription = new Subscription();
  cargando: boolean;

  ingresos: number;
  egresos: number;

  cuantosIngresos: number;
  cuantosEgresos: number;

   // Doughnut
   public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
   public doughnutChartData: number[] = [];
 

  subscription: Subscription = new Subscription();

  constructor( private store: Store<AppState> ) { }

  ngOnInit() {
    
    this.store.dispatch( new ActivarLoadingAction() );

    this.loadingSubs = this.store.select('ui')
      .subscribe( ui => this.cargando = ui.isLoading);

    this.subscription = this.store.select('ingresoEgreso')
      .subscribe(
        ingresoEgreso => {
          this.contarIngresoEgreso( ingresoEgreso.items );
          this.store.dispatch( new DesactivarLoadingAction() );
        }
      );
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

  contarIngresoEgreso( items: IngresoEgreso[] ) {

    this.ingresos = 0;
    this.egresos = 0;
    this.cuantosEgresos = 0;
    this.cuantosIngresos = 0;

    items.forEach( (item: IngresoEgreso) => {
        if ( item.tipo === 'ingreso') {
          this.cuantosIngresos ++;
          this.ingresos += item.monto;
        } else {
          this.cuantosEgresos ++;
          this.egresos += item.monto;
        }
    });

    this.doughnutChartData = [ this.ingresos, this.egresos ];
    
  }

}
