import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToasttService } from 'src/app/shared/components/toast/toastt.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService:UserService,private router:Router,private cookieService: CookieService) { }
  loginForm!:FormGroup
  validUser!:String
  ngOnInit(): void {
    this.createForm()
  }

  createForm(){
    this.loginForm=new FormGroup({
      userName:new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required]),
    }
    )
  }
  submitForm(){
    console.log(this.loginForm)
    this.userService.loginUser(this.loginForm.value).subscribe((val:any)=>{
      if(val.valid === 1){
        this.cookieService.set("userName", val.userName);
        this.cookieService.set("fullName", val.fullName);
        this.cookieService.set("token", val.token);
        this.cookieService.set("userID", val.userID);
        this.router.navigate(["medium"])
      }
    })
  }
}
