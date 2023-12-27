import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediumComponent } from './medium.component';
import { SharedModule } from '../shared/shared.module';
import { MediumHeaderComponent } from './medium-header/medium-header.component';
import { MediumContentComponent } from './medium-content/medium-content.component';
import {HttpClientModule} from '@angular/common/http';
import { ViewBlogComponent } from './view-blog/view-blog.component'
import { RouterModule } from '@angular/router';
import { CreatePostComponent } from './create-post/create-post.component';

@NgModule({
  declarations: [
    MediumComponent,
    MediumHeaderComponent,
    MediumContentComponent,
    ViewBlogComponent,
    CreatePostComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    RouterModule,
  ]
})
export class MediumModule { }
