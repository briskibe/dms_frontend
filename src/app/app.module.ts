import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MaterialModule} from "./material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthModule} from "./auth/auth.module";
import {HttpClientModule} from "@angular/common/http";
import {DashboardModule} from "./dashboard/dashboard.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    AuthModule,
    HttpClientModule,
    DashboardModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
