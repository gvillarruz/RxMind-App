import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

interface medication{
  name : string;
}

var Medication1_info: any[];
var Medication2_info: any[];
var Medication3_info: any[];

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

  constructor(private http: HttpClient) {
    this.medication_list = [
      {name: " "},
      {name: " "},
      {name: " "}];

      Medication1_info = [];
      Medication2_info = [];
      Medication3_info = [];
   }

  ngOnInit(): void {
    this.http.post("https://www.rxmind.tech/login", {
        username: "admin",
        password: "admin",
      })
      .subscribe((data: any) => {

        //Load the med arrays and the UI with the medication names
        //Gather the remaining pills from the data as well
        var nmeds = data.medications.length;
        if(nmeds >= 1){
        Medication1_info[0] = data.medications[0].name;
        this.medication_list[0].name = data.medications[0].name;
        //Gathering the remaining pills info
        Medication1_info[1] = data.medications[0].remainingPills;

          if(nmeds >=2){
            Medication2_info[0] = data.medications[1].name;
            this.medication_list[1].name = data.medications[1].name;
            //Gathering remaining pills info
            Medication2_info[1] = data.medications[1].remainingPills;
            
            if(nmeds == 3){
              Medication3_info[0] = data.medication[2].name;
              this.medication_list[2].name = data.medications[2].name;
              //Gathering remaining pills info
              Medication3_info[1] = data.medications[2].remainingPills;
            }
          }
        }

        //Gathering any warning info from the server 
        /*if(data.warning.length != 0){

        }*/
        console.log(data);
      });
  }

  onSelect(medication: medication) : void{
    this.selectedmedication = medication;
    //Update the amount of meds left progress bar 

    //Call the calendar command here


    //Populate the data in the view for the selected medication
  }

  Dismiss_notif(){
    //Dismiss the missed notification when the user clicks this button 
    //Clear the notification label
    //Clear the notification in the web-server
  }

}
