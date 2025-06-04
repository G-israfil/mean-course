import {Component, effect, inject, Injector, Input, OnInit, signal} from '@angular/core';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelActionRow,
  MatExpansionPanelHeader
} from "@angular/material/expansion";
import {Post} from "../models/post.model";
import {PostService} from "../../services/post.service";
import {MatButton} from "@angular/material/button";
import {toSignal} from "@angular/core/rxjs-interop";
import {firstValueFrom} from "rxjs";
import {RouterLink} from "@angular/router";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatPaginator} from "@angular/material/paginator";

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
  private injector = inject(Injector);
  loading: boolean = false;
  posts = signal<Post[]>([]);
  refresh = signal(false);
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

  constructor() {
  }

  ngOnInit(): void {
    this.fetchPosts();
    this.refresh = this.postService.subscribeLoading();
    this.initializeRefreshEffect();
  }

  async fetchPosts(){
    this.loading = true;
    this.posts = signal(await firstValueFrom(this.postService.getPosts(this.paginationFilter)));
    this.loading = false;
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
