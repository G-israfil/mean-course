import {inject, Injectable, signal} from '@angular/core';
import {Post} from "../models/post.model";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  httpClient = inject(HttpClient);
  baseUrl = environment.baseUrl;
  loading = signal<boolean>(false);
  constructor() { }

  addPost(post: Post){
    const formData = new FormData();
    formData.append('title',post.title!);
    formData.append('content',post.content!);
    formData.append('image',post.image!,post.title);

    return this.httpClient.post(`${this.baseUrl}/posts`,formData).pipe(
      map((res) => {
        this.refresh();
        return res;
      })
    );
  }

  updatePost(post: Post){
    const formData = new FormData();
    formData.append('title',post.title!);
    formData.append('content',post.content!);
    formData.append("id",post.id!);
    formData.append('image',post.image!,post.title);

    return this.httpClient.put(`${this.baseUrl}/posts`,formData);
  }

  deletePost(id: string){
    return this.httpClient.delete(`${this.baseUrl}/posts/${id}`).subscribe(res => {
      this.refresh();
    });
  }

  getPost(postId:string){
    return this.httpClient.get<any>(`${this.baseUrl}/posts/${postId}`).pipe(
      map(res => {
        if(res.post){
          res.post = {
            id: res.post._id,
            title: res.post.title,
            content: res.post.content
          };
        }
        return res.post;
      }),
    );
  }

  getPostImage(postId:string){
    return this.httpClient.get<any>(`${this.baseUrl}/posts/${postId}/image`);
  }

  getPosts(paginationInfo?:any){
    const searchParams = new URLSearchParams(paginationInfo).toString();
    console.log(searchParams);
    return this.httpClient.get<any>(`${this.baseUrl}/posts?${searchParams}`).pipe(
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
    this.loading.set(!this.loading());
  }

  subscribeLoading(){
    return this.loading;
  }
}
