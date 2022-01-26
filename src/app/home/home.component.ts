import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  calendarvalue !: Date;
  sliderval : number= 70;
  medleft : string = "2 Weeks";
  medprogressnum : number = 70;

  constructor() {  }

  ngOnInit(): void{}

}
