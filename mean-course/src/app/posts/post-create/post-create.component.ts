import {Component, EventEmitter, inject, OnInit, Output, signal} from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatCard} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {Post} from "../models/post.model";
import {PostService} from "../../services/post.service";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {Router} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";
import {mimeType} from "../../utils/validators/mime-type.validator";

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatCard,
    MatButton,
    MatError,
    MatProgressSpinner,
    NgOptimizedImage
  ],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss'
})
export class PostCreateComponent implements OnInit{
  fb = inject(FormBuilder);
  postService: PostService = inject(PostService);
  router:Router = inject(Router)
  filePlaceHolder:any = {};
  loading:boolean = false;
  imagePreviewString:string = "";
  postForm = this.fb.group({
    title: ["",[Validators.required,Validators.minLength(3)]],
    content: ["",[Validators.required,Validators.minLength(3)]],
    image: [this.filePlaceHolder,[Validators.required]]
  })

  ngOnInit(): void {
  }

  savePost(){
    if(this.postForm.invalid){
      this.postForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.postService.addPost(this.postForm.getRawValue() as Post).subscribe(res => {
      this.loading = false;
      this.router.navigate(['']);
    });
    this.postForm.reset();
  }

  onImageChanged(event: any){
    const fileList =  event.target.files;
    if(fileList && fileList.length > 0){
      const file:File = fileList[0];
      this.postForm.get('image')?.setValue(file!);
      this.postForm.get('image')?.updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imagePreviewString = fileReader.result as string;
      }

      fileReader.readAsDataURL(file)
    }
  }


}
