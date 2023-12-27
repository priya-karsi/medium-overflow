import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationConstants } from '../shared/constants/ApplicationConstants';

@Injectable({
  providedIn: 'root'
})
export class MediumService {

  constructor(private httpClient : HttpClient) { }


  fetchBlogs(): Observable<any>{
    return this.httpClient.get(`${ApplicationConstants.APIURL}/blogs`,{withCredentials:true});
  }

  fetchBlog(slug:string): Observable<any>{
    return this.httpClient.get(`${ApplicationConstants.APIURL}/blog/${slug}`);
  }

  authenticate(body:any): Observable<any>{
    return this.httpClient.post(`${ApplicationConstants.APIURL}/authenticate`,body);
  }

  addPost(body:any): Observable<any>{
    return this.httpClient.post(`${ApplicationConstants.APIURL}/blogs`,body)
  }
  
  getCategories():Observable<any>{
    return this.httpClient.get(`${ApplicationConstants.APIURL}/categories`)
  }


  getTags(value:string):Observable<any>{
    return this.httpClient.get(`${ApplicationConstants.APIURL}/tags/${value}`)
  }

  validateSlug(slug:string):Observable<any>{
    return this.httpClient.get(`${ApplicationConstants.APIURL}/checkSlug/${slug}`)
  }


}
