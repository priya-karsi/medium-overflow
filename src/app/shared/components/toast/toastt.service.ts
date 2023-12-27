import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToasttService {
  constructor() { }
  toasts:any=[]
  // {
  //   text:'message',
  //   delay:1000,
  //   class:'red'
  // }
  show(toast:any){
    this.toasts.push(toast)
  }

}
