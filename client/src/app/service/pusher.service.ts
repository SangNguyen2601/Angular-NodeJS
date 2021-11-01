import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class PusherService {
   isTableUpdate:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
}