import {Injectable} from "@angular/core";
import {User} from "firebase";
import {AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {from, Observable} from "rxjs";
import UserCredential = firebase.auth.UserCredential;
import {UserModel} from "./user.model";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs/operators";
import {environment} from "../../environments/environment";

@Injectable()
export class AuthService {
  user: User;
  isAuthenticated = false;

  private endpointPath = environment.endpointUrl;

  constructor(public router: Router, private http: HttpClient) {
    this.setUserAuthenticated();
  }

  login(username: string, password: string): Observable<UserModel> {
    return this.http.post<UserModel>(this.endpointPath + "/api/auth/signin", { username: username, password: password }).pipe(
      tap(user => {
        this.isAuthenticated = true;
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuthenticated = false;
  }

  setUserAuthenticated() {
    if (!this.isAuthenticated) {
      if (localStorage.getItem("token")) {
        this.isAuthenticated = true;
      }
    }
  }

  isUserAuthenticated(): boolean {
    return this.isAuthenticated;
  }
}
