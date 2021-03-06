import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  private loggedIn=false;

  constructor(private loginService:LoginService, private router:Router) { }

  ngOnInit() {
    this.loginService.checkSession().subscribe(
      res=>{
        console.log("session active");
        this.loggedIn=true;  
      },
      error=>{
        this.loggedIn=false;
      }
    );
  }

  logout() {
    this.loginService.logout().subscribe(
      res=>{
        console.log("session inactive");
        location.reload();
      },
      error=>{
        console.log(error);
      }
    );
    this.router.navigate(["/"]);
  }

  toggleDisplay(){
    this.loggedIn=!this.loggedIn;
  }

}
