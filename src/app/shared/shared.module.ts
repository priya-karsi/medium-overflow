import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ToastComponent } from './components/toast/toast.component';



@NgModule({
  declarations: [
    SidenavComponent,
    ToastComponent,
    
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    NgbModule
  ],
  exports:[
    FontAwesomeModule,
    NgbModule,
    SidenavComponent,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ToastComponent
  ]
})
export class SharedModule { }
