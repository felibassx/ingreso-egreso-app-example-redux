import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.routes';
// import { AuthGuardService } from '../auth/auth-guard.service';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { 
        path: '',
        component: DashboardComponent,
        children: dashboardRoutes,
        // canActivate: [ AuthGuardService ] // implementar el guard
    },
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule { }
