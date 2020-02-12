import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer'
import { ActionReducerMap } from '@ngrx/store';
import * as fromIngresoEgreso from './ingreso-egreso/ingreso-egreso.reducer';
import { ingresoEgresoReducer } from './ingreso-egreso/ingreso-egreso.reducer';

export interface AppState {
    ui: fromUI.State;
    auth: fromAuth.AuthState;
    ingresoEgreso: fromIngresoEgreso.IngresoEgresoState;
}

export const appReducer: ActionReducerMap<AppState> = {
    ui: fromUI.uiReducer,
    auth: fromAuth.authReducer,
    ingresoEgreso: fromIngresoEgreso.ingresoEgresoReducer
};
