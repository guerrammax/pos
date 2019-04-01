import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  loginStatus$ : Observable<boolean>;
  UserName$: Observable<string>;

  constructor(private acct :AccountService)
  {

  }

  ngOnInit()
  {
    this.loginStatus$ = this.acct.isLoggesIn;
    this.UserName$ = this.acct.currentUserName;
  }

  onLogout()
  {
    this.acct.logout();
  }

 
}
