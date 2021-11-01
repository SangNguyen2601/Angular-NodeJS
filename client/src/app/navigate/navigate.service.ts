import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class NavigateService{

    checkLoged:boolean;

    constructor(private http: HttpClient) { }
}