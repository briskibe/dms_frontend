import {Route, RouterModule} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {NgModule} from "@angular/core";

const routes: Route[] = [
  { path: "/", component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
