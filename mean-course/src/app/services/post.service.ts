import {inject, Injectable, signal} from '@angular/core';
import {Post} from "../posts/models/post.model";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {PostListResponse} from "../posts/models/post-list.model";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts = signal<Post[]>([]);
  httpClient = inject(HttpClient);
  baseUrl = "http://localhost:3000/api";
  updated = signal<boolean>(false);
  constructor() { }

  addPost(post: Post){
    return this.httpClient.post(`${this.baseUrl}/posts`,post).subscribe(res => {
      this.refresh();
    });
  }

  deletePost(id: string){
    return this.httpClient.delete(`${this.baseUrl}/posts/${id}`).subscribe(res => {
      console.log("deleted successfully");
      this.refresh();
    });
  }

  getPosts(){
    return this.httpClient.get<any>(`${this.baseUrl}/posts`).pipe(
      map(res => {
        return res.posts.map((post:any) => {
          return {
            id: post._id,
            title: post.title,
            content: post.content
          }
        });
      }),
    );
  }

  refresh(){
    this.updated.set(!this.updated());
  }

  subscribeRefresh(){
    return this.updated;
  }
}
