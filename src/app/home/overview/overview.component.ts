import { Component, OnInit } from '@angular/core';

interface medication{
  name : string;
}

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

  medication_list : medication[];
  selectedmedication? :medication;

  onSelect(medication: medication) : void{
    this.selectedmedication = medication;
    //Populate the data in the view for the selected medication
  }

  Dismiss_notif(){
    //Dismiss the missed notification when the user clicks this button 
    //Clear the notification label
    //Clear the notification in the web-server
  }

  constructor() {
    this.medication_list = [
      {name: "Medicine 1"},
      {name: "Medicine 2"},
      {name: "Medicine 3"}];
   }

  ngOnInit(): void {
  }

}
