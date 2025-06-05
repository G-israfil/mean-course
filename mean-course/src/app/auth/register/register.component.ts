import {Component, inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatError, MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatError,
    MatFormField,
    MatInput,
    MatProgressSpinner,
    ReactiveFormsModule,
    MatCardHeader,
    MatCardTitle
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  loading:boolean = false;

  fb:FormBuilder = inject(FormBuilder);
  authService: AuthService = inject(AuthService);

  postForm: FormGroup = this.fb.group({
    email: ["",[]],
    password: ["",[]]
  });



  register(){
    this.authService.register(this.postForm.getRawValue())
  }
}
