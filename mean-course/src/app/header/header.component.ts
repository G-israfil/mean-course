import {Component, effect, inject, Injector, OnInit, signal} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MatAnchor, MatButton} from "@angular/material/button";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbar,
    RouterLink,
    MatAnchor,
    RouterLinkActive,
    MatButton
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  authService = inject(AuthService);
  authenticated = signal(false);
  injector = inject(Injector)

  ngOnInit(): void {
    this.checkAuthorization();
  }

  checkAuthorization(){
    effect(() => {
      console.log(this.authService.getAuthStatus()());
      this.authenticated.set(this.authService.getAuthStatus()())
    },{
      injector: this.injector,
      allowSignalWrites: true
    })
  }

  logout(){
    this.authService.logout();
  }
}
