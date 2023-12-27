import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";
import { MediumService } from "src/app/medium/medium.service";

@Injectable()
export class AuthenticateInterceptor implements HttpInterceptor {
  constructor(private mediumSevice: MediumService,private cookieService: CookieService) {}
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const reqCopy = httpRequest.clone({withCredentials: true})
         //can set new header
         reqCopy.headers.set("userID",this.cookieService.get("userID"));
         reqCopy.headers.set("token",this.cookieService.get("token"));
        
         return next.handle(reqCopy);
  }
}