import { Component, OnInit } from '@angular/core';
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons';
import { CookieService } from 'ngx-cookie-service';
import { BlogData } from 'src/app/shared/interfaces/blog.interface';
import { MediumService } from '../medium.service';

@Component({
  selector: 'app-medium-content',
  templateUrl: './medium-content.component.html',
  styleUrls: ['./medium-content.component.css'],
})
export class MediumContentComponent implements OnInit {
  icons = {
    likeIcon: faHeart,
    commentIcon: faComment,
  };
  blogsData!: BlogData[];

  constructor(private mediumService: MediumService,private cookieService: CookieService) {}

  ngOnInit(): void {
    this.authenticate();
    this.fetchBlogs();
  }


  generateBody():any{
    const body = this.cookieService.getAll();
    return body;
  }
  authenticate():void{
    this.mediumService.authenticate(this.generateBody()).subscribe((value:any)=>console.warn(value))
  }
  fetchBlogs(): void {
    this.mediumService.fetchBlogs().subscribe((value: BlogData[]) => {
      this.blogsData = value;
    });
  }
}
