import {Component, inject} from '@angular/core';
import {MatError, MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatButton,
    MatCard,
    MatError,
    MatProgressSpinner,
    ReactiveFormsModule,
    MatCardHeader,
    MatCardTitle
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loading:boolean = false;

  fb:FormBuilder = inject(FormBuilder);
  authService: AuthService = inject(AuthService);

  postForm: FormGroup = this.fb.group({
    email: ["",[]],
    password: ["",[]]
  });



  login(){
    this.authService.login(this.postForm.getRawValue())
  }
}
