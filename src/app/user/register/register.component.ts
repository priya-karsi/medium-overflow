import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToasttService } from 'src/app/shared/components/toast/toastt.service';

import { UserService } from '../user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService:UserService,private toastService:ToasttService) { }
  registrationForm!:FormGroup
  validUser!:String
  ngOnInit(): void {
    this.createForm()
  }

  createForm(){
    this.registrationForm=new FormGroup({
      FirstName:new FormControl('',[Validators.required]),
      LastName:new FormControl('',[Validators.required]),
      UserName:new FormControl('',[Validators.required]),
      Email:new FormControl('',[Validators.required]),
      Password:new FormControl('',[Validators.required]),
      ConfirmPassword:new FormControl('',[Validators.required]),
      Mobile:new FormControl('',[Validators.required]),
      Bio:new FormControl('',[Validators.required])
    }
    )
  }
  submitForm(){
    console.log(this.registrationForm)
    if(this.checkPassword())
    {
      this.validateUser(this.registrationForm.value.UserName)
    }
    else
      {
        this.toastService.show({text:'Invalid Password',className:'bg-danger',delay:2000})
        this.registrationForm.reset()
    }
    // this.registrationForm.reset()
  }
  checkPassword(){
    return this.registrationForm.value.Password===this.registrationForm.value.ConfirmPassword
  }
  validateUser(UserName:String){
    this.userService.validateUser(UserName).subscribe((value)=>{
      this.validUser=value.validYN
      console.log(this.validUser)
      if(this.validUser==="YES")
        {
          //insert ka logic
          const body=this.generateBody()
          this.addUser(body)
        }
      else{
        this.toastService.show({text:'User with this username already exists',className:'bg-danger',delay:2000})
        this.registrationForm.reset()
      }
    })
  }
  generateBody():any{
    const body={
      ...this.registrationForm.value
    }
    console.log(body)
    return body
  }
  addUser(body:any){
    this.userService.addUser(body).subscribe(()=>console.log("done"))
  }

}
