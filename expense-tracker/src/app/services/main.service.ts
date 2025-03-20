import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  Data:any
  constructor() { }

  getData( data:any){
    this.Data = data
  }

  postData(){
    return this.Data
  }
}
