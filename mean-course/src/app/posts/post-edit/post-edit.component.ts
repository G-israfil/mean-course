import {Component, effect, inject, Injector, OnInit, signal} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {PostService} from "../../services/post.service";
import {Post} from "../models/post.model";
import {MatButton} from "@angular/material/button";
import {MatCard} from "@angular/material/card";
import {MatError, MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ActivatedRoute, Router} from "@angular/router";
import {firstValueFrom} from "rxjs";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-post-edit',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatCard,
    MatError,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatProgressSpinner
  ],
  templateUrl: './post-edit.component.html',
  styleUrl: './post-edit.component.scss'
})
export class PostEditComponent implements OnInit{
  fb = inject(FormBuilder);
  postService: PostService = inject(PostService);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  injector:Injector = inject(Injector);
  router:Router = inject(Router)
  filePlaceHolder:any = {};
  imagePreviewString:string = "";
  postId:string = '';
  loading:boolean = false;
  post =  signal(null);
  postForm = this.fb.group({
    title: ["",[Validators.required]],
    content: ["",[Validators.required]],
    image: [this.filePlaceHolder,[Validators.required]]
  })
  constructor() {

  }
  ngOnInit(): void {
    this.postId = this.activatedRoute.snapshot.paramMap.get("postId") ?? "";
    if(!this.postId) {
      console.log("post id is mandatory");
    }
    this.fetchPost();
    this.fillFormData();
  }

  async fetchPost(){
    this.post.set(signal(await firstValueFrom(this.postService.getPost(this.postId)))());
  }

  fillFormData(){
    effect(() => {
      if(this.post()){
        const post = this.post();
        this.postForm.patchValue(post!);
        this.imagePreviewString = this.getImage();
      }
    },{
      injector: this.injector
    });
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

  getImage(){
    return `http://localhost:3000/api/posts/${this.postId}/image`;
  }
  savePost(){
    if(this.postForm.invalid){
      this.postForm.markAllAsTouched();
      return;
    }
    const body = this.postForm.getRawValue() as Post;
    body.id = this.postId;
    this.loading = true;
    this.postService.updatePost(body).subscribe(res => {
      this.loading = false;
      this.router.navigate(['']);
    });
  }
}
