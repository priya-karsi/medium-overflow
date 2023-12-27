import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ApplicationConstants } from '../shared/constants/ApplicationConstants';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient:HttpClient) { }
  validateUser(userName:String):Observable<any>{
    return this.httpClient.get(`${ApplicationConstants.APIURL}/checkUser/${userName}`)
  }
  addUser(body:any):Observable<any>{
    return this.httpClient.post(`${ApplicationConstants.APIURL}/insertUser`,body)
  }

  loginUser(body:any):Observable<any>{
    // let options = new RequestOptions({ headers: headers, withCredentials: true });

    return this.httpClient.post(`${ApplicationConstants.APIURL}/loginUser`,body,{withCredentials:true})
  }
}
