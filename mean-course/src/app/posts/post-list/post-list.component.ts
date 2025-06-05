import {Component, effect, inject, Injector, OnInit, signal} from '@angular/core';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelActionRow,
  MatExpansionPanelHeader
} from "@angular/material/expansion";
import {Post} from "../../models/post.model";
import {PostService} from "../../services/post.service";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatPaginator} from "@angular/material/paginator";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelActionRow,
    MatButton,
    RouterLink,
    MatProgressSpinner,
    MatPaginator
  ],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent implements OnInit{
  postService: PostService = inject(PostService);
  authService: AuthService = inject(AuthService);
  injector = inject(Injector);
  loading: boolean = false;
  posts = signal<Post[]>([]);
  refresh = signal(false);
  authenticated = signal(false);
  paginationFilter = {
    pageIndex: 0,
    pageSize: 9999
  }
  initializeRefreshEffect():void{
    effect(() => {
      if(this.refresh()){
        this.fetchPosts();
        this.postService.refresh();
      }
    },{
      allowSignalWrites:true,
      injector: this.injector
    });
  }

  checkAuthorization(){
    effect(() => {
      this.authenticated.set(this.authService.getAuthStatus()())
    },{
      injector: this.injector,
      allowSignalWrites: true
    })
  }

  constructor() {
  }

  ngOnInit(): void {
    this.fetchPosts();
    this.refresh = this.postService.subscribeLoading();
    this.initializeRefreshEffect();
    this.checkAuthorization();
  }

  async fetchPosts(){
    this.loading = true;
    this.postService.getPosts(this.paginationFilter).subscribe(res => {
      this.posts.set(res);
      this.loading = false;
    })
  }

  deletePost(post:Post){
    this.postService.deletePost(post.id!);
  }

  getImage(id:string){
    return `http://localhost:3000/api/posts/${id}/image`;
  }

  onPageChange(event:any){
    this.paginationFilter = {...event};
    this.fetchPosts();
  }
}
