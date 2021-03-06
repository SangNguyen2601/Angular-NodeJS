import { Component, OnInit, ViewChild } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ListbookService } from './listBook.service';
import { dataResponse } from '../httpHandle/dataResponde';
import { PusherService } from '../service/pusher.service';

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css'],
  providers: [ListbookService],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ListBookComponent implements OnInit {

  isUpdate: boolean;
  response: dataResponse;
  errorMessage: boolean;
  ELEMENT_DATA: PeriodicElement[] = [];

  //dataSource = ELEMENT_DATA;
  dataSource = new MatTableDataSource<PeriodicElement>();
  columnsToDisplay = ['stt', 'title', 'category'];
  expandedElement: PeriodicElement | null;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private ls: ListbookService,
    private _pusher : PusherService
  ){
    this._pusher.isTableUpdate.subscribe(isTableUpdate => {
      this.isUpdate = isTableUpdate
  });
  }

  ngOnInit(): void {
    this.getListBook();
  }

  ngDoCheck(): void {
    if(this.isUpdate){
      this.ELEMENT_DATA=[];
      this.getListBook();
      this._pusher.isTableUpdate.next(false);
    }
  }

  getListBook(){
    if(sessionStorage.getItem("token")){
      this.ls.getListBook()
            .subscribe((res: dataResponse)=>{
              this.response = res;
              if(!this.response.success){
                this.errorMessage = true;
              }
              else{
                for(let i=0;i< this.response.data.length;i++){
                  let dataTable = {
                    stt: i+1,
                    title: this.response.data[i]['title'],
                    category: this.response.data[i]['category'],
                    decription: this.response.data[i]['decription']
                  }
                  this.ELEMENT_DATA.push(dataTable)
                }
                this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
                this.dataSource.paginator = this.paginator;
                //console.log(this.ELEMENT_DATA)
              }
            })
    }
  }
}

export interface PeriodicElement {
  stt: number;
  title: string;
  category: string;
  decription: string;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   {
//     stt: 1,
//     title: 'T??i th???y hoa v??ng tr??n c??? xanh',
//     category: 'Truy???n d??i',
//     description: `Cu???n s??ch vi???t v??? tu???i th?? ngh??o kh?? ??? m???t l??ng qu??, b??n c???nh ????? t??i t??nh y??u quen thu???c, 
//     l???n ?????u ti??n Nguy???n Nh???t ??nh ????a v??o t??c ph???m c???a m??nh nh???ng nh??n v???t ph???n di???n v?? ?????t ra v???n ????? ?????o ?????c nh?? s??? v?? t??m, 
//     c??i ??c. 81 ch????ng ng???n l?? 81 c??u chuy???n nh??? c???a nh???ng ?????a tr??? x???y ra ??? m???t ng??i l??ng: chuy???n v??? con c??c C???u tr???i, chuy???n ma, 
//     chuy???n c??ng ch??a v?? ho??ng t???, b??n c???nh chuy???n ????i ??n, ch??y nh??, l???t l???i,...`
//   }
// ]

