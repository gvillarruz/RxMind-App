import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

//Notification and Reminder Location
interface notification_locations {
  name: string;
}

//To Enable/Disable missed dose notifications
interface missed_dose_notif {
  name: string;
}

//To select time period between missed dose and notification
interface timefornotif {
  name: string;
}

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"],
})
export class SettingsComponent implements OnInit {
  notifilocations_list: notification_locations[];
  selectednotiflocation: notification_locations[] = [];

  missed_dose_option: missed_dose_notif[];
  selectedmissed_dose_option!: missed_dose_notif;

  timefornotification: timefornotif[];
  selectedtimefornotification!: timefornotif;

  notifemail!: string;
  notifphone!: string;
  notifdevice!: string;

  constructor(private http: HttpClient) {
    this.notifilocations_list = [
      { name: "Dispensing Device" },
      { name: "Email" },
      { name: "Text" },
    ];

    this.missed_dose_option = [{ name: "Enable" }, { name: "Disable" }];

    this.timefornotification = [
      { name: "5 minutes"},
      { name: "15 minutes" },
      { name: "30 minutes" },
      { name: "60 minutes" },
    ];
  }

  ngOnInit(): void {
    this.http.get("https://www.rxmind.tech/settings").subscribe((data: any) => {
      //Select values in the notification location multiselect
      if (data.emailNotif != null) {
        console.log(data.emailNotif);
        this.selectednotiflocation.push({ name: data.emailNotif });
        this.notifemail = data.emailNotif;
        console.log("Seting email");
      }
      if (data.deviceNotif == true) {
        this.selectednotiflocation.push({ name: data.deviceNotif });
        this.notifdevice = data.deviceNotif;
      }
      if (data.textNotif != null) {
        this.selectednotiflocation.push({ name: data.textNotif });
        this.notifphone = data.textNotif;
      }

      if (data.timeForNotif == "5min") {
        this.selectedtimefornotification = {name: "5 minutes"};
        this.selectedtimefornotification = data.timeForNotif;
      }

      if (data.timeForNotif == "10min") {
        this.selectedtimefornotification = {name: "10 minutes"};
        this.selectedtimefornotification = data.timeForNotif;
      }

      if(data.timefornotif == "15min"){
        this.selectedtimefornotification = {name: "15 minutes"};
        this.selectedtimefornotification = data.timeForNotif;
      }

      if(data.missedDose == true){
        this.selectedmissed_dose_option = {name: "Enable"};
      }

      if(data.missedDose == false){
        this.selectedmissed_dose_option = {name: "Disable"};
      }
      console.log(data);
    });
  }

  onSave() {
    //Gather all of the data placed in the view
    //Send to the web server to parse and save
    console.log(this.selectednotiflocation);
    console.log({
      missedDose: this.selectedmissed_dose_option.name,
      deviceNotif: this.selectednotiflocation[1],
      emailNotif: this.notifemail,
      textNotif: this.notifphone,
      timeForNotif: this.selectedtimefornotification,
    });

    // this.http
    //   .post("https://www.rxmind.tech/settings", {
    //     missedDose: this.selectedmissed_dose_option.name,
    //     deviceNotif: this.selectednotiflocation[1],
    //     emailNotif: this.notifemail,
    //     textNotif: this.notifphone,
    //     timeForNotif: this.selectedtimefornotification,
    //   })

    /*missedDose: "true",this.selectedmissed_dose_option.name,
      deviceNotif: "true",
      emailNotif: "gvillarruz@ryerson.ca", //null to disable
      textNotif: 6476873576,
      timeForNotif: "5min"*/

    // .subscribe((data) => {
    //   console.log(data);
    // });
  }
}
