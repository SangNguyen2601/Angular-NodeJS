import { Component, OnInit } from '@angular/core';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import { AddbookService } from './addBook.service';
import { dataResponse } from '../httpHandle/dataResponde';
import { PusherService } from '../service/pusher.service';

interface Category {
  name: string;
}

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
  providers: [AddbookService]
})
export class AddBookComponent implements OnInit {

  checkLogin:boolean;
  
  categories : Category[] = [
    {name: 'Drama'},
    {name: 'Comedy'},
    {name: 'Sport'}
  ];
  //form validate
  formGroup: FormGroup;
  //form value
  titleValue = '';
  selected = '';
  decriptionValue = '';
  //
  response: dataResponse;
  errorMessage: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private as: AddbookService,
    private _snackBar: MatSnackBar,
    private _pusher : PusherService
  ){
  }

  ngOnInit(): void {
    if(!sessionStorage.getItem("token")){
      this.checkLogin = false;
    }
    else{
      this.checkLogin = true;
    }

    this.createForm();
  }

  get titleControl() { return this.formGroup.get('titleControl'); }
  get selectControl() { return this.formGroup.get('selectControl'); }
  get textAreaControl() { return this.formGroup.get('textAreaControl'); }

  createForm(){
    this.formGroup = this.formBuilder.group({
      titleControl: ['', [Validators.required, Validators.maxLength(30)]],
      selectControl: ['', Validators.required],
      textAreaControl: ['', Validators.required],
    });
  }

  addBook(){
    if(this.titleValue && this.selected['name'] && this.decriptionValue){
      let body={
        title: this.titleValue,
        category: this.selected['name'],
        decription: this.decriptionValue
      }
      this.as.addBook(body)
            .subscribe((res: dataResponse)=>{
              this.response = res;
              if(!this.response.success){
                this.errorMessage = true;
              }
              else{
                //console.log(this.response.message);
                const config = new MatSnackBarConfig();
                config.panelClass = ['custom-class'];
                config.duration = 3000
                this._snackBar.open(`${this.titleValue} has been added to your storage`, "Successfully!", config);
                this.createForm();
                this.enableUpdate();
              }
            })
    }
  }

  enableUpdate(){
    this._pusher.isTableUpdate.next(true);
  }
}