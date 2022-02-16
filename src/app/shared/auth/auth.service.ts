import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
@Injectable()
export class AuthService {
  token: string;
  userInfo = null;

  constructor(private router: Router) { }

  saveUserInfo(user: any) {
    this.userInfo = user;
    this.token = this.userInfo.token;
    sessionStorage.setItem('_u', JSON.stringify(user));
  }

  getUserInfo() {
    if (!this.userInfo || !this.userInfo.token) {
      this.refreshFromSession();
    }
    return this.userInfo;
  }

  refreshFromSession() {
    this.userInfo = JSON.parse(sessionStorage.getItem('_u'));
    this.token = this.userInfo ? this.userInfo.token : null;
  }

  logout() {
    this.token = null;
    sessionStorage.removeItem('_u');
    this.router.navigate(['/']).then(r => r).catch(err => console.error('navigation --'+err));
  }

  getToken() {
    if(!this.token) {
      this.refreshFromSession();
    }
    return this.token;
  }

  isAuthenticated() {
  
    // return this.userInfo && this.userInfo.token;
    return true;
  }
}
