import {NgModule} from "@angular/core";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {MaterialModule} from "../material.module";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    DashboardRoutingModule,
    MaterialModule,
    CommonModule
  ]
})
export class DashboardModule {

}
