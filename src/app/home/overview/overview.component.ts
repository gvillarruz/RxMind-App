import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  calendarvalue !: Date;
  sliderval : number= 70;
  medleft : string = "2 Weeks";
  medprogressnum : number = 70;

  constructor() { }

  ngOnInit(): void {
  }

}
