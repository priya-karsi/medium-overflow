import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MediumComponent } from './medium/medium.component';
import { MediumHeaderComponent } from './medium/medium-header/medium-header.component';
import { ViewBlogComponent } from './medium/view-blog/view-blog.component';
import { CreatePostComponent } from './medium/create-post/create-post.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticateInterceptor } from './shared/interceptor/authenticate.interceptor';



const routes: Routes = [
  {path:'medium', component: MediumComponent},
  {path:'viewblog', component: ViewBlogComponent},
  {path:'create', component: CreatePostComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},

  
];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS, useClass: AuthenticateInterceptor, multi:true
    },
]
})
export class AppRoutingModule { }
