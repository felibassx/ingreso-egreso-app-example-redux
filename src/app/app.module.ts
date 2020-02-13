import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';

// REDUX
import { StoreModule } from '@ngrx/store';
import { appReducer } from './app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


// externas
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AuthModule } from './auth/auth.module';


@NgModule({
  declarations: [
    AppComponent,    
  ],
  imports: [
    BrowserModule,
    AuthModule,
    AppRoutingModule,
    AngularFireModule.initializeApp( environment.firebase ),
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    AngularFirestoreModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
