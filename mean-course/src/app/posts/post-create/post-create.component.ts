import {Component, EventEmitter, inject, OnInit, Output, signal} from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatCard} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {Post} from "../models/post.model";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatCard,
    MatButton,
    MatError
  ],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss'
})
export class PostCreateComponent implements OnInit{
  fb = inject(FormBuilder);
  postService: PostService = inject(PostService);

  postForm = this.fb.group({
    title: ["",[Validators.required]],
    content: ["",[Validators.required]]
  })

  ngOnInit(): void {
  }

  savePost(){
    if(this.postForm.invalid){
      this.postForm.markAllAsTouched();
      return;
    }
    this.postService.addPost(this.postForm.getRawValue() as Post);
  }
}
