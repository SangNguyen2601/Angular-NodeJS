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
//     title: 'Tôi thấy hoa vàng trên cỏ xanh',
//     category: 'Truyện dài',
//     description: `Cuốn sách viết về tuổi thơ nghèo khó ở một làng quê, bên cạnh đề tài tình yêu quen thuộc, 
//     lần đầu tiên Nguyễn Nhật Ánh đưa vào tác phẩm của mình những nhân vật phản diện và đặt ra vấn đề đạo đức như sự vô tâm, 
//     cái ác. 81 chương ngắn là 81 câu chuyện nhỏ của những đứa trẻ xảy ra ở một ngôi làng: chuyện về con cóc Cậu trời, chuyện ma, 
//     chuyện công chúa và hoàng tử, bên cạnh chuyện đói ăn, cháy nhà, lụt lội,...`
//   }
// ]

