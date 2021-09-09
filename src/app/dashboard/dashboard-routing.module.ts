import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {InterventionsComponent} from "./components/interventions/interventions.component";
import {EvidentionComponent} from "./components/evidention/evidention.component";
import {AdoptedComponent} from "./components/adopted/adopted.component";
import {InterventionEditComponent} from "./components/intervention-edit/intervention-edit.component";
import {NonAdoptedComponent} from "./components/non-adopted/non-adopted.component";
import {AuthGuard} from "../auth/auth.guard";

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'interventions', component: InterventionsComponent, canActivate: [AuthGuard] },
  { path: 'interventions/:id', component: InterventionEditComponent, canActivate: [AuthGuard] },
  { path: 'evidention', component: EvidentionComponent, canActivate: [AuthGuard] },
  { path: 'adopted', component: AdoptedComponent, canActivate: [AuthGuard] },
  { path: 'nonadopted', component: NonAdoptedComponent, canActivate: [AuthGuard] }
  ];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {

}
