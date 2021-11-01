import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class ListbookService{

    constructor(
        private http: HttpClient,
    ){
    }

    getListBook(){
        if(sessionStorage.getItem("token")){
            let header = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            })
            let httpOption = {
                headers: header,
            }

            return this.http.get(`${environment.apiUrl}/books`, httpOption)
                            .pipe(
                                catchError((error)=>{
                                    return Observable.throw(error.message || "server error.")
                                })
                            )
        }
    }
}