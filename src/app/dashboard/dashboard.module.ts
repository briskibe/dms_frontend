import {NgModule} from "@angular/core";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {MaterialModule} from "../material.module";
import {CommonModule, DatePipe} from "@angular/common";
import {DataService} from "./services/data.service";
import { InterventionsComponent } from './components/interventions/interventions.component';
import { EvidentionComponent } from './components/evidention/evidention.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import { AdoptedComponent } from './components/adopted/adopted.component';
import {DetailsComponent} from "./components/details/details.component";
import {AngularOpenlayersModule} from "ngx-openlayers";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { InterventionEditComponent } from './components/intervention-edit/intervention-edit.component';
import { InterventionUpdateComponent } from './components/intervention-update/intervention-update.component';
import { NonAdoptedComponent } from './components/non-adopted/non-adopted.component';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AdditionalHeaderInterceptor} from "./services/additional-header.interceptor";


@NgModule({
  declarations: [DashboardComponent, InterventionsComponent, EvidentionComponent, AdoptedComponent, DetailsComponent, InterventionEditComponent, InterventionUpdateComponent, NonAdoptedComponent],
  imports: [
    DashboardRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    CommonModule,
    FlexLayoutModule,
    AngularOpenlayersModule,
    FormsModule
  ],
  providers: [
    DataService,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AdditionalHeaderInterceptor,
      multi: true,
    }
  ]
})
export class DashboardModule {

}
