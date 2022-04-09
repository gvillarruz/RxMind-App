import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HomeService } from "../../home.service";
import { Message } from "primeng/api";
import { MessageService } from "primeng/api";

interface medication {
  name: String;
}

@Component({
  selector: "app-overview",
  templateUrl: "./overview.component.html",
  styleUrls: ["./overview.component.scss"],
  providers: [MessageService],
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
  mednotselected = false;

  msgs1: Message[];

  constructor(
    private http: HttpClient,
    private homeService: HomeService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.http
      .post("https://www.rxmind.tech/login", {
        username: "admin",
        password: "admin",
      })
      .subscribe((data: any) => {
        this.homeService.homeData = data;
        console.log(data);

        data.warnings.forEach((warning: any) => {
          this.messageService.add({
            severity: "warn",
            summary: "Warning",
            detail: warning,
            life: 60000,
          });
        });

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

  onSelect(event): void {
    console.log(event.value);
    console.log(this.Medication1_info);
    console.log(this.Medication2_info);
    console.log(this.Medication3_info);
    this.selectedmedication = event.value;
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

  Dispense1(){
    //Dispense the medication from cabinet 1 when the 'Dispense Cabinet 1' button is clicked in the UI
    this.http
    .post("https://www.rxmind.tech/demo", { })
    .subscribe((data: any) => {
      console.log(data); });
  }

  Dispense2(){
     //Dispense the medication from cabinet 2 when the 'Dispense Cabinet 2' button is clicked in the UI
  }

  Dispense3(){
     //Dispense the medication from cabinet 3 when the 'Dispense Cabinet 3' button is clicked in the UI
  }

  Dispense4(){
    //Dispense two medications from cabinet 2 when the 'Dispense 2 Pills' button is clicked in the UI
  }


  onSelectDate(calendarvalue: Date) {
    if (
      this.selectedmedication == undefined ||
      this.selectedmedication == null
    ) {
      this.mednotselected = true;
      return;
    } else {
      this.mednotselected = false;
    }
    //Make a post request with the date, first format the date
    let date_send = "date";
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
          if (data.medications[0].medicationFullyTaken == true) {
            this.calendarmedtaken = "Yes";
            if (data.medications[0].timesTaken.length >= 1) {
              timetaken = data.medications[0].timesTaken[0];
              if (data.medications[0].timesTaken.length >= 2) {
                timetaken =
                  timetaken + ", " + data.medications[0].timesTaken[1];
                if (data.medications[0].timesTaken.length == 3) {
                  timetaken =
                    timetaken + ", " + data.medications[0].timesTaken[2];
                }
              }
            }
            this.calendartimetaken = timetaken;
          } else if (data.medications[0].medicationFullyTaken == false) {
            this.calendarmedtaken = "No";
            this.calendartimetaken = "";
          }
          this.Iscalendarmedtakenvisible = true;
          this.Iscalendartimetakenvisible = true;

          if (this.selectedmedication.name == this.Medication2_info[0]) {
            if (data.medications[1].medicationFullyTaken == true) {
              this.calendarmedtaken = "Yes";
              if (data.medications[1].timesTaken.length >= 1) {
                timetaken = data.medications[1].timesTaken[0];
                if (data.medications[1].timesTaken.length >= 2) {
                  timetaken =
                    timetaken + ", " + data.medications[1].timesTaken[1];
                  if (data.medications[1].timesTaken.length == 3) {
                    timetaken =
                      timetaken + ", " + data.medications[1].timesTaken[2];
                  }
                }
              }
              this.calendartimetaken = timetaken;
            } else if (data.medications[1].medicationFullyTaken == false) {
              this.calendarmedtaken = "No";
              this.calendartimetaken = "";
            }
            this.Iscalendarmedtakenvisible = true;
            this.Iscalendartimetakenvisible = true;

            if (this.selectedmedication.name == this.Medication3_info[0]) {
              if (data.medications[2].medicationFullyTaken == true) {
                this.calendarmedtaken = "Yes";
                if (data.medications[2].timesTaken.length >= 1) {
                  timetaken = data.medications[2].timesTaken[0];
                  if (data.medications[2].timesTaken.length >= 2) {
                    timetaken =
                      timetaken + ", " + data.medications[2].timesTaken[1];
                    if (data.medications[2].timesTaken.length == 3) {
                      timetaken =
                        timetaken + ", " + data.medications[2].timesTaken[2];
                    }
                  }
                }
                this.calendartimetaken = timetaken;
              } else if (data.medications[2].medicationFullyTaken == false) {
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

  clear() {
    this.messageService.clear();
  }
}
