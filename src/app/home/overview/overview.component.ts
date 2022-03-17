import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HomeService } from "../../home.service";

interface medication{
  name: String;
}

@Component({
  selector: "app-overview",
  templateUrl: "./overview.component.html",
  styleUrls: ["./overview.component.scss"],
})
export class OverviewComponent implements OnInit {
  calendarvalue!: Date;
  sliderval: number = 70;
  medleft: string = "";
  medprogressnum: number = 0;

  medication_list: { name: string }[] = [];
  Medication1_info = [];
  Medication2_info = [];
  Medication3_info = [];
  MedWarnings = [];

  selectedmedication: medication;

  warnings_list!: any[];
  dismisswarningvisible = false;
  Iscalendarmedtakenvisible = false;
  Iscalendartimetakenvisible = false;
  calendarmedtaken: any;
  calendartimetaken: any;

  constructor(private http: HttpClient, private homeService: HomeService) {}

  ngOnInit(): void {
    this.http
      .post("https://www.rxmind.tech/login", {
        username: "admin",
        password: "admin",
      })
      .subscribe((data: any) => {
        this.homeService.homeData = data;
        //Load the med arrays and the UI with the medication names
        //Gather the remaining pills from the data as well

        this.medication_list = data.medications.map((med: any) => {
          return { name: med.name };
        });

        let nmeds = data.medications.length;
        if (nmeds >= 1) {
          this.Medication1_info.push(data.medications[0].name);
          //Gathering the remaining pills info
          this.Medication1_info.push(data.medications[0].remainingPills);
          if (nmeds >= 2) {
            this.Medication2_info.push(data.medications[1].name);
            //Gathering remaining pills info
            this.Medication2_info.push(data.medications[1].remainingPills);
            if (nmeds == 3) {
              this.Medication3_info.push(data.medications[2].name);
              //Gathering remaining pills info
              this.Medication3_info.push(data.medications[2].remainingPills);
            }
          }
        }
        this.MedWarnings = data.warnings;

        //Gathering any warning info from the server
        if (data.warnings.length != 0) {
          this.dismisswarningvisible = true;
        }
      });
  }

  onSelect(medication: medication): void {
    this.selectedmedication = medication;

    //Figure out which medicationx_info array the selected medication is from
    //Update the number of medications left and the progress bar in the UI
    if (this.selectedmedication.name == this.Medication1_info[0]) {
      this.medleft = this.Medication1_info[1];
      this.medprogressnum = this.Medication1_info[1];
    } else if (this.selectedmedication.name == this.Medication2_info[0]) {
      this.medleft = this.Medication2_info[1];
      this.medprogressnum = this.Medication2_info[1];
    } else if (this.selectedmedication.name == this.Medication3_info[0]) {
      this.medleft = this.Medication3_info[1];
      this.medprogressnum = this.Medication3_info[1];
    }
  }

  onSelectDate(calendarvalue: Date) {
    //Make a post request with the date, first format the date
    let date_send = "date"
    let dd = String(calendarvalue.getDate()).padStart(2, "0");
    let mm = String(calendarvalue.getMonth() + 1).padStart(2, "0");
    let yyyy = calendarvalue.getFullYear();
    date_send = yyyy + "-" + mm + "-" + dd;

    console.log("Inside the onSelectDate function with date:", date_send);
    this.http
      .post("https://www.rxmind.tech/calendar", {
        date: date_send,
      })
      .subscribe((data: any) => {
        console.log(data);
        //Capture the return
        //Based on the number of medications that are returned, output the medication information for that day 
        let timetaken = "";
        if (this.selectedmedication.name == this.Medication1_info[0]) {
          if(data.medications[0].medicationFullyTaken == true){
            this.calendarmedtaken = "Yes";
            if(data.medications[0].timesTaken.length >= 1){
              timetaken = data.medications[0].timesTaken[0];
              if(data.medications[0].timesTaken.length >= 2){
                timetaken = timetaken + ", " + data.medications[0].timesTaken[1];
                if(data.medications[0].timesTaken.length == 3){
                  timetaken = timetaken + ", " + data.medications[0].timesTaken[2];
                }
              }    
            } 
            this.calendartimetaken = timetaken; 
          }
          else if(data.medications[0].medicationFullyTaken == false){
            this.calendarmedtaken = "No";
            this.calendartimetaken = ""; 
          }
          this.Iscalendarmedtakenvisible = true;
          this.Iscalendartimetakenvisible = true;

          if (this.selectedmedication.name == this.Medication2_info[0]) {
            if(data.medications[1].medicationFullyTaken == true){
              this.calendarmedtaken = "Yes";
              if(data.medications[1].timesTaken.length >= 1){
                timetaken = data.medications[1].timesTaken[0];
                if(data.medications[1].timesTaken.length >= 2){
                  timetaken = timetaken + ", " + data.medications[1].timesTaken[1];
                  if(data.medications[1].timesTaken.length == 3){
                    timetaken = timetaken + ", " + data.medications[1].timesTaken[2];
                  }
                }    
              } 
              this.calendartimetaken = timetaken; 
            }
            else if(data.medications[1].medicationFullyTaken == false){
              this.calendarmedtaken = "No";
              this.calendartimetaken = ""; 
            }
            this.Iscalendarmedtakenvisible = true;
            this.Iscalendartimetakenvisible = true;

            if (this.selectedmedication.name == this.Medication3_info[0]) {
              if(data.medications[2].medicationFullyTaken == true){
                this.calendarmedtaken = "Yes";
                if(data.medications[2].timesTaken.length >= 1){
                  timetaken = data.medications[2].timesTaken[0];
                  if(data.medications[2].timesTaken.length >= 2){
                    timetaken = timetaken + ", " + data.medications[2].timesTaken[1];
                    if(data.medications[2].timesTaken.length == 3){
                      timetaken = timetaken + ", " + data.medications[2].timesTaken[2];
                    }
                  }    
                } 
                this.calendartimetaken = timetaken; 
              }
              else if(data.medications[2].medicationFullyTaken == false){
                this.calendarmedtaken = "No";
                this.calendartimetaken = ""; 
              }
              this.Iscalendarmedtakenvisible = true;
              this.Iscalendartimetakenvisible = true;
            }    
          }
        }
      });
  }

  Dismiss_notif() {
    //Dismiss the missed notification when the user clicks this button
    //Clear the warnings recieved from the web-server

    this.MedWarnings = [];
    //Clear the warnings visible in the UI
    for (let i = 0; i < this.warnings_list.length; i++) {
      this.warnings_list[i] = null;
    }
    //Hide the dismiss warning button
    this.dismisswarningvisible = false;
  }
}
