import { Routes } from '@angular/router';
import {PostListComponent} from "./posts/post-list/post-list.component";
import {PostCreateComponent} from "./posts/post-create/post-create.component";
import {PostEditComponent} from "./posts/post-edit/post-edit.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {authGuard} from "./guard/auth.guard";

export const routes: Routes = [
  {
    path: '',component: PostListComponent
  },
  {
    path: 'create',component: PostCreateComponent,
    canActivate: [authGuard]
  },
  {
    path: 'edit/:postId',component: PostEditComponent,
    canActivate:[authGuard]
  },
  {
    path: 'auth/login',component: LoginComponent
  },
  {
    path: 'auth/register',component: RegisterComponent
  }
];
