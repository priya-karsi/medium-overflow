import { Component, OnInit } from '@angular/core';
import { MediumService } from '../medium.service';

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.css']
})
export class ViewBlogComponent implements OnInit {

  data:any
  constructor(private mediumService: MediumService) { }

  ngOnInit(): void {
    this.fetchBlog()
  }


  fetchBlog():void{
    this.mediumService.fetchBlog("vv").subscribe((data:any)=>this.data = data)
  }
}
