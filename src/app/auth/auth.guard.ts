import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor(public auth: AuthService, public router: Router) { }

  canLoad(): boolean {
    return this.checkAuth();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkAuth();
  }


  private checkAuth() {
    if (!this.auth.isUserAuthenticated()) {
      if (!localStorage.getItem('token')) {
        this.router.navigate(['/login']);
        return false;
      }
    }
    return true;
  }
}
