import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {MaterialModule} from "../material.module";
import {AuthRoutingModule} from "./auth-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlexModule} from "@angular/flex-layout";


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    MaterialModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexModule,
  ]
})
export class AuthModule { }
