import { Component, OnInit } from '@angular/core';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';
import { passwordMatchValidator } from './passwordMatchValidation';
import { RegisterService } from './register.service';
import { dataResponse } from '../httpHandle/dataResponde';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';

import { AuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [RegisterService]
})
export class RegisterComponent implements OnInit {

  formGroup: FormGroup;
  hide = true;
  response : dataResponse;
  errorMessage=false;
  //values
  firstName:string;
  lastName:string;
  email:string;
  password:string;
  //GG login
  userGG: SocialUser;

  constructor(
    private formBuilder: FormBuilder,
    private rs: RegisterService,
    public dialog: MatDialog,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      firstnameControl: ['', [Validators.required]],
      lastnameControl: ['', [Validators.required]],
      emailControl: ['', [Validators.required, Validators.email]],
      passwordControl: ['', [Validators.required, Validators.minLength(6)]],
      CfpasswordControl: ['', [Validators.required]],

    }, {validator:passwordMatchValidator});

  }
  get firstnameControl() { return this.formGroup.get('firstnameControl'); }
  get lastnameControl() { return this.formGroup.get('lastnameControl'); }
  get emailControl() { return this.formGroup.get('emailControl'); }
  get passwordControl() { return this.formGroup.get('passwordControl'); }
  get CfpasswordControl() { return this.formGroup.get('CfpasswordControl'); }

  onPasswordInput() {
    if (this.formGroup.hasError('passwordMismatch'))
      this.CfpasswordControl.setErrors([{'passwordMismatch': true}]);
    else
      this.CfpasswordControl.setErrors(null);
  }

  getErrorMessage() {
    if (this.emailControl.hasError('required')) {
      return 'This field is required';
    }

    return this.emailControl.hasError('email') ? 'Not a valid email' : '';
  }

  openDialog() {
    this.dialog.open(DialogLoading);
  }

  redirectPage(){
    this.router.navigate(['login'])
  }

  createAcc(){
    let body={
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName
    }
    this.rs.createAcc(body)
          .subscribe((res: dataResponse)=>{
            this.response = res;
            if(!this.response.success){
              this.errorMessage=true;
            }
            else{
              this.errorMessage=true;
              this.openDialog();
              setTimeout(()=>{
                this.dialog.closeAll();
                this.redirectPage();
              },1500)
            }
          })
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
    this.rs.createAcc(data)
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
}

@Component({
  selector: 'dialog-loading',
  templateUrl: './dialog-loading.html',
  styleUrls: ['./register.component.css'],
})
export class DialogLoading {
  constructor() {}
}