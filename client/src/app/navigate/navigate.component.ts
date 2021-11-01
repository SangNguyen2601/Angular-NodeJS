import { Component, OnInit } from '@angular/core';
import { NavigateService } from './navigate.service';
import { PusherService } from '../service/pusher.service';

@Component({
  selector: 'app-navigate',
  templateUrl: './navigate.component.html',
  styleUrls: ['./navigate.component.css'],
  providers: [NavigateService]
})
export class NavigateComponent implements OnInit {

  loged: boolean;
  lastName:string;
  isUpdate: boolean;

  constructor(
    private nav : NavigateService,
    private _pusher : PusherService
  ){
    this._pusher.isTableUpdate.subscribe(isTableUpdate => {
      this.isUpdate = isTableUpdate
    })
  }

  ngOnInit(): void {
    
  }

  ngDoCheck(): void{
    if(!sessionStorage.getItem('token')){
      this.loged = false;
    }
    else{
      this.loged = true;
      this.lastName = sessionStorage.getItem('lastName');
    }
  }

  logout(){
    sessionStorage.clear();
    this._pusher.isTableUpdate.next(false);
    alert("See you later !");
  }
}
