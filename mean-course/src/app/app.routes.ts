import { Routes } from '@angular/router';
import {PostListComponent} from "./posts/post-list/post-list.component";
import {PostCreateComponent} from "./posts/post-create/post-create.component";
import {PostEditComponent} from "./posts/post-edit/post-edit.component";

export const routes: Routes = [
  {
    path: '',component: PostListComponent
  },
  {
    path: 'create',component: PostCreateComponent
  },
  {
    path: 'edit/:postId',component: PostEditComponent
  }
];
