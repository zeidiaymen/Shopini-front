import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/userService/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private userService:UserService) { }

  token!:any;
  currentUser!: user
  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.userService.getUserFromToken(this.token).subscribe(data => {
      
      this.currentUser = data;
      
    })
  }

}
