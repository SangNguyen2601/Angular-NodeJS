import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class ProfileService{
    constructor(private http: HttpClient) { }

    
}