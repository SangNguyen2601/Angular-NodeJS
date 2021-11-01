import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap, mapTo } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class LoginService{
    constructor(private http: HttpClient) { }

    login(data : Object){
        let dataObject = JSON.stringify(data);
        let header = new HttpHeaders({
            'Content-Type': 'application/json'
        })
        let httpOption = {
            headers: header,
        }

        return this.http.post(`${environment.apiUrl}/`, dataObject, httpOption)
                    .pipe(
                        catchError((error)=>{
                            return Observable.throw(error.message || "server error.")
                        })
                    )
    }
    createAcc(data: Object) {
        let dataObject = JSON.stringify(data);
        let header = new HttpHeaders({
            'Content-Type': 'application/json'
        })
        let httpOption = {
            headers: header,
        }

        return this.http.post(`${environment.apiUrl}/user`, dataObject, httpOption)
                        .pipe(
                            catchError((error) => {
                                return Observable.throw(error.message || "server error.")
                            })
                        )
    }
}