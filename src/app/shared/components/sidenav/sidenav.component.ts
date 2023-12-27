import { Component, OnInit } from '@angular/core';
import { faDashboard, faUserGraduate,faChalkboardTeacher, faRulerVertical, faBookReader, faSearch, faComment, faBell, faSignOut, faClose, faBlog, faContactBook, faHome, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  icons ={
    homeIcon: faHome,
    blogIcon: faBlog,
    questionIcon: faQuestionCircle,
    contactIcon:faContactBook,
    searchIcon: faSearch,
    comment: faComment,
    bell: faBell,
    signout: faSignOut,
    crossIcon: faClose

  }


  // maintain track of whether sidenav is open or close
  sideNavCollapse = true;
  navbarCollapse = true;
  constructor() { }

  ngOnInit(): void {
  }

}
