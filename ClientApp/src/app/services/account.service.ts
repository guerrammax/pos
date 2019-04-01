import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrlLogin: string = "/api/account/login";

  private baseUrlRegister: string = "/api/account/register";

  private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());
  private UserName = new BehaviorSubject<string>(localStorage.getItem('username'));
  private UserRole = new BehaviorSubject<string>(localStorage.getItem('userRole'));

  constructor(private http: HttpClient, private router: Router) {

  }

  // Register Method
  register(username: string, password: string, email: string) {
    return this.http.post<any>(this.baseUrlRegister, { username, password, email }).pipe(map(result => {
      //registration was successful
      return result;
    }, error => {
        return error;
      }));
  }

  login(username: string, password: string) {
    return this.http.post<any>(this.baseUrlLogin, { username, password })
      .pipe(
        //sigle objject --key value 
        map(result => {
          //login succe
          if (result && result.token) {
            //store user details
            this.loginStatus.next(true);
            localStorage.setItem('loginStatus', '1');
            localStorage.setItem('jwt', result.token);
            localStorage.setItem('username', result.username);
            localStorage.setItem('expiration', result.expiration);
            localStorage.setItem('userRole', result.userRole);
          }
          return result;
        })

      );
  }

  logout() {
    // Set Loginstatus to false and delete saved jwt cookie
    this.loginStatus.next(false);
    localStorage.removeItem('jwt');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    localStorage.removeItem('expiration');
    localStorage.setItem('loginStatus', '0');
    this.router.navigate(['/login']);
    console.log("Logged Out Successfully");
  }

  checkLoginStatus(): boolean {

    var loginCookie = localStorage.getItem("loginStatus");
    if (loginCookie == "1") {
      return true;
    }
    return false;
  }
  get isLoggesIn() {
    return this.loginStatus.asObservable();
  }

  get currentUserName() {
    return this.UserName.asObservable();
  }

  get currentUserRole() {
    return this.UserRole.asObservable();
  }
}
