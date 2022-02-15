import { Component, OnInit } from '@angular/core';

declare var require: any

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: any
  password: any = ''
    //imgname= require("src/assets/images/RxMindLogo.jpg");
    isSigninVisible = true;
  constructor() { }

  ngOnInit(): void {
  }
  
  onUserSignIn(){
    //Call the server to check if the entered account information exists
    this.isSigninVisible = false;

    //If exists, prepare to recieve medication info from the server 
    //Route to home page and load information recieved here from server

  }


}
