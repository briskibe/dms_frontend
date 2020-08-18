import {Injectable} from "@angular/core";
import {CanLoad, Router} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanLoad {

  constructor(public auth: AuthService, public router: Router) { }

  canLoad(): boolean {
    console.log("HERE");
    if (!this.auth.isUserLoggedIn()) {
      this.router.navigate(['/login']);
      console.log("HERE 2");
      return false;
    }
    return true;
  }

}
