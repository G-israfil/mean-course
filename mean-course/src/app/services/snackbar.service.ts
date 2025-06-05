import {inject, Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  _snackBar = inject(MatSnackBar);
  constructor() { }



  showSnackBar(message:string,action?:string){
    this._snackBar.open(message,action,{
      verticalPosition: "top",
      horizontalPosition: "center"
    })
  }
}
