import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user.model";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  httpClient = inject(HttpClient);
  router = inject(Router);
  baseUrl = "http://localhost:3000/api";
  authStatus = signal(false);
  constructor() {
    const token = this.getToken();
    if(token) this.authStatus.set(true);
    console.log(this.authStatus());
  }

  register(user: User){
    return this.httpClient.post(`${this.baseUrl}/user/register`,user).subscribe(res => {
    })
  }

  login(user: User){
    return this.httpClient.post(`${this.baseUrl}/user/login`,user).subscribe((res: any) => {
      console.log(res);
      if(res.token){
        localStorage.setItem("token",res.token);
        this.authStatus.set(true);
        this.router.navigate(["/"]);
      }
    })
  }

  getToken(){
    return localStorage.getItem("token");
  }

  logout():void{
    localStorage.removeItem("token");
    this.authStatus.set(false);
    this.router.navigate(["/"]);
  }

  getAuthStatus(){
    return this.authStatus;
  }
}
