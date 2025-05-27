import {Component, EventEmitter, inject, OnInit, Output, signal} from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatCard} from "@angular/material/card";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatCard,
    MatButton
  ],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss'
})
export class PostCreateComponent implements OnInit{
  fb = inject(FormBuilder);
  postForm = this.fb.group({
    title: [null,[]],
    content: [null,[]]
  })
  @Output() newPost:EventEmitter<any> =  new EventEmitter();

  ngOnInit(): void {
  }

  savePost(){
    this.newPost.emit(this.postForm.getRawValue());
  }
}
