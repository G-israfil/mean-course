import { Routes } from '@angular/router';
import {PostListComponent} from "./posts/post-list/post-list.component";
import {PostCreateComponent} from "./posts/post-create/post-create.component";
import {PostEditComponent} from "./posts/post-edit/post-edit.component";
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
    path: 'auth/login',
    loadComponent: () => import('./auth/login/login.component').then(c => c.LoginComponent)
  },
  {
    path: 'auth/register',
    loadComponent: () => import('./auth/register/register.component').then(c => c.RegisterComponent)
  }
];
