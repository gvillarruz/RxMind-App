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
  constructor() { }

  ngOnInit(): void {
  }

}
