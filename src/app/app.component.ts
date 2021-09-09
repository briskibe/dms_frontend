import {ChangeDetectorRef, Component} from '@angular/core';
import {MediaMatcher} from "@angular/cdk/layout";
import {AuthService} from "./auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dms-frontend';

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              private authService: AuthService,
              private router: Router
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 850px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout() {
    this.authService.logout();
  }

  isUserLoggedIn(): boolean {
    return this.authService.isUserAuthenticated();
  }
}
