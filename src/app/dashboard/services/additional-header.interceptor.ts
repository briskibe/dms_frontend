import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {catchError} from "rxjs/operators";
import {AuthService} from "../../auth/auth.service";

@Injectable()
export class AdditionalHeaderInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const exclude = "/signin";
    if (req.url.search(exclude) === -1) {
      req = req.clone({ headers: req.headers.append('Authorization', 'Bearer ' + localStorage.getItem("token")) });
    }

    return next.handle(req).pipe(catchError(err => {
      if (err.status === 401) {
        this.authService.logout();
        this.router.navigate(['/login']);
      }
      return throwError(err);
    }));
  }
}
