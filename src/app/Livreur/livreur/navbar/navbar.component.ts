import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/userService/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
tog:boolean=false ;
prix = localStorage.getItem('price')
togs()
{
  this.tog=!this.tog;
  console.log(this.tog)
}
  constructor(private userService :UserService) {   console.log (localStorage.getItem('price'))
}
delete()
{
  localStorage.removeItem('price')
this.prix =localStorage.getItem('price');
}
token!:any;
currentUser:any ;

  ngOnInit(): void {

    this.token = localStorage.getItem('token');
    this.userService.getUserFromToken(this.token).subscribe(data => {
      
      this.currentUser = data;
      
    })
  }

}
