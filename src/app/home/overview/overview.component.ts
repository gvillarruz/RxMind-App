import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HomeService } from "../../home.service";

interface medication {
  name: string;
}

let Medication1_info: any[];
let Medication2_info: any[];
let Medication3_info: any[];
let MedWarnings: any[];

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

  medication_list: medication[];
  selectedmedication?: medication;

  warnings_list!: any[];
  dismisswarningvisible = false;
  Iscalendarmedtakenvisible = false;
  Iscalendartimetakenvisible = false;
  calendarmedtaken: any = "sample";
  calendartimetaken: any = "sample";

  constructor(private http: HttpClient, private homeService: HomeService) {
    this.medication_list = [];

    Medication1_info = [];
    Medication2_info = [];
    Medication3_info = [];
    MedWarnings = [];
  }

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
          Medication1_info[0] = data.medications[0].name;
          //Gathering the remaining pills info
          Medication1_info[1] = data.medications[0].remainingPills;
          if (nmeds >= 2) {
            Medication2_info[0] = data.medications[1].name;
            //Gathering remaining pills info
            Medication2_info[1] = data.medications[1].remainingPills;
            if (nmeds == 3) {
              Medication3_info[0] = data.medication[2].name;
              //Gathering remaining pills info
              Medication3_info[1] = data.medications[2].remainingPills;
            }
          }
        }

        //Gathering any warning info from the server
        if (data.warnings.length != 0) {
          for (let i = 0; i < data.warnings.length; i++) {
            MedWarnings[i] = data.warning[i];
          }
          this.dismisswarningvisible = true;
        }

        console.log(data);
      });
  }

  onSelect(medication: medication): void {
    this.selectedmedication = medication;

    //Figure out which medicationx_info array the selected medication is from
    //Update the number of medications left and the progress bar in the UI
    if (this.selectedmedication.name == Medication1_info[0]) {
      this.medleft = Medication1_info[1];
      this.medprogressnum = Medication1_info[1];
    } else if (this.selectedmedication.name == Medication2_info[0]) {
      this.medleft = Medication2_info[1];
      this.medprogressnum = Medication2_info[1];
    } else if (this.selectedmedication.name == Medication3_info[0]) {
      this.medleft = Medication3_info[1];
      this.medprogressnum = Medication3_info[1];
    }
  }

  onSelectDate(calendarvalue: Date) {
    //Make a post request with the date, first format the date
    let dd = String(calendarvalue.getDate()).padStart(2, "0");
    let mm = String(calendarvalue.getMonth() + 1).padStart(2, "0");
    let yyyy = calendarvalue.getFullYear();
    let date_send = yyyy + "-" + mm + "-" + dd;

    console.log("Inside the onSelectDate function with date:", date_send);
    this.http
      .post("https://www.rxmind.tech/calendar", {
        date: date_send,
      })
      .subscribe((data: any) => {
        console.log(data);
        //Capture the return
        //Based on the selected medication, output the medication information for that day
        if (this.selectedmedication == Medication1_info[0]) {
          this.calendarmedtaken = data.medications[0].medicationTaken;
          this.calendartimetaken = data.medications[0].timeTaken;
          this.Iscalendarmedtakenvisible = true;
          this.Iscalendartimetakenvisible = true;
        } else if (this.selectedmedication == Medication2_info[0]) {
          this.calendarmedtaken = data.medications[1].medicationTaken;
          this.calendartimetaken = data.medications[1].timeTaken;
          this.Iscalendarmedtakenvisible = true;
          this.Iscalendartimetakenvisible = true;
        } else if (this.selectedmedication == Medication3_info[0]) {
          this.calendarmedtaken = data.medications[2].medicationTaken;
          this.calendartimetaken = data.medications[2].timeTaken;
          this.Iscalendarmedtakenvisible = true;
          this.Iscalendartimetakenvisible = true;
        }
      });
  }

  Dismiss_notif() {
    //Dismiss the missed notification when the user clicks this button
    //Clear the warnings recieved from the web-server
    for (let i = 0; i < MedWarnings.length; i++) {
      MedWarnings[i] = null;
    }
    //Clear the warnings visible in the UI
    for (let i = 0; i < this.warnings_list.length; i++) {
      this.warnings_list[i] = null;
    }
    //Hide the dismiss warning button
    this.dismisswarningvisible = false;
  }
}
