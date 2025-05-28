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

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelActionRow,
    MatButton
  ],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent implements OnInit{
  postService: PostService = inject(PostService);
  private injector = inject(Injector);

  posts = signal<Post[]>([]);
  refresh = signal(false);

  initializeRefreshEffect():void{
    effect(() => {
      console.log(this.refresh());
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
    this.refresh = this.postService.subscribeRefresh();
    this.initializeRefreshEffect();
  }

  async fetchPosts(){
    this.posts = signal(await firstValueFrom(this.postService.getPosts()));
    console.log(this.posts());
  }

  deletePost(post:Post){
    this.postService.deletePost(post.id);
  }
  // posts: any[] = [
  //   {
  //   title: 'First Post',content: 'first content of the posts'
  //   },
  //   {
  //     title: 'Second Post',content: 'second content of the posts'
  //   },
  //   {
  //     title: 'Third Post',content: 'third content of the posts'
  //   },
  // ]
}
