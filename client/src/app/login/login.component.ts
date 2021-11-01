import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { LoginService } from './login.service';
import { dataResponse } from '../httpHandle/dataResponde';

import { AuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;
  hide= true;
  loginEmail='';
  loginPass='';
  response : dataResponse;
  errorMessage=false;
  //GG login
  userGG: SocialUser;

  constructor(
    private formBuilder: FormBuilder,
    private ls:LoginService,
    private router: Router,
    public dialog: MatDialog,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      emailControl: ['', [Validators.required, Validators.email]],
      passwordControl: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  get emailControl() { return this.formGroup.get('emailControl'); }
  get passwordControl() { return this.formGroup.get('passwordControl'); }

  getErrorMessage() {
    if (this.emailControl.hasError('required')) {
      return 'This field is required';
    }
    return this.emailControl.hasError('email') ? 'Not a valid email' : '';
  }

  login(){
    if(this.loginEmail!='' && this.loginPass!=''){
      let body={
        email:this.loginEmail,
        password: this.loginPass
      }
      this.ls.login(body)
            .subscribe((res: dataResponse)=>{
              this.response = res;
              if(!this.response.success){
                this.errorMessage=true;
              }
              else{
                this.openDialog();
                setTimeout(()=>{
                  let data = this.response.data;
                  sessionStorage.setItem("token",data['token']);
                  sessionStorage.setItem("firstName",data['firstName']);
                  sessionStorage.setItem("lastName",data['lastName']);
                  this.dialog.closeAll();
                  this.goHome();
                },1500)
              }
            })
    }
  }

  signInWithGoogle(){
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    //GG
    this.authService.authState.subscribe((user) => {
      if(user){
        this.userGG = user;
        
        let body={
          email: this.userGG.email,
          firstName: this.userGG.firstName,
          lastName: this.userGG.lastName,
          isGG: 'isGG'
        }
        this.loginGG(body);
      }
    });
  }

  loginGG(data){
    this.ls.createAcc(data)
          .subscribe((res: dataResponse)=>{
            this.response = res;
            if(!this.response.success){
              this.errorMessage=true;
            }
            else{
              this.openDialog();
              setTimeout(()=>{
                let data = this.response.data;
                sessionStorage.setItem("token",data['token']);
                sessionStorage.setItem("firstName",data['firstName']);
                sessionStorage.setItem("lastName",data['lastName']);
                this.dialog.closeAll();
                this.authService.signOut();
                this.goHome();
              },1500)
            }
          })
  }

  goHome(){
    this.router.navigate([''])
  }
  openDialog() {
    this.dialog.open(DialogLoading);
  }
}

@Component({
  selector: 'dialog-loading',
  templateUrl: './dialog-loading.html',
  styleUrls: ['./login.component.css'],
})
export class DialogLoading {
  constructor() {}
}