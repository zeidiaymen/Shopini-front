import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/userService/user.service';
import { ProdInOrderService } from '../Services/prod-in-order.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private serv: ProdInOrderService,private userService :UserService) {}
  token!:any;
  currentUser:any ;

  
 ///
  nb=0;
  ngOnInit(): void {
    window.onscroll = function () {
      myFunction();
    };
    //this.serv.getNbProdInOrder().subscribe((e) => {
     // this.nb = e;
   // });

    

    var navbar = document.getElementById('navnav');
    var sticky = navbar?.offsetTop;

    function myFunction() {
      if (window.pageYOffset >= 200) {
        navbar?.classList.add('sticky');
      } else {
        navbar?.classList.remove('sticky');
      }
    }

    this.token = localStorage.getItem('token');
    this.userService.getUserFromToken(this.token).subscribe(data => {
      
      this.currentUser = data;
      this.serv.getAllProdsInORder(this.currentUser.id).subscribe(e=>{
        console.log ( e );
        this.nb = e.length;
      })  
    })



  }
}
