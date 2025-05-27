import {Component, Input, signal} from '@angular/core';
import {MatAccordion, MatExpansionPanel, MatExpansionPanelHeader} from "@angular/material/expansion";

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader
  ],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent {
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
  @Input() posts:any[] = [];
}
