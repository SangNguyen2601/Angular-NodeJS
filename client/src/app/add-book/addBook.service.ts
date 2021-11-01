import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class AddbookService{
    constructor(private http: HttpClient) { }

    addBook(data: Object){
        let dataObject = JSON.stringify(data);
        let header = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem("token")
        })
        let httpOption = {
            headers: header,
        }

        return this.http.post(`${environment.apiUrl}/book`,dataObject,httpOption)
                        .pipe(
                            catchError((error)=>{
                                return Observable.throw(error.message || "server error.")
                            })
                        )
    }
}