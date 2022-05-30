import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../shared/userService/user.service";
import {user} from "../../shared/models/user";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  constructor(private router:Router,private userService: UserService) {}


  token!:any;
  currentUser!: user;
  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.userService.getUserFromToken(this.token).subscribe(data => {

      this.currentUser = data;

    })
  }

}
