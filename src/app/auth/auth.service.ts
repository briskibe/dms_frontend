import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {JWTToken} from "./JWTToken";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  BASE_PATH = 'http://localhost:8090/dms/login';
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';

  public username: String;
  public token: String;

  constructor(private http: HttpClient) {}

  executeJwtAuthenticationService(username, password) {
    console.log(username);
    return this.http.post(`${this.BASE_PATH}/generate-token`, {
      username,
      password
    }).pipe(map((res: JWTToken) => {
      this.username = username;
      this.token = res.token;
      this.registerSuccessfulLoginForJwt(username);
    }));
  }

  createJWTToken(token) {
    return 'Bearer ' + token
  }

  registerSuccessfulLoginForJwt(username) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username)
  }

  registerSuccessfulLogin(username, password) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username)
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    this.username = null;
    this.token = null;
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) return false;
    return true;
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) return '';
    return user
  }
}
