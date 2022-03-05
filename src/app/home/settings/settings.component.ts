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

var Settings_info: any[];  

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"],
})
export class SettingsComponent implements OnInit {
  notifilocations_list: notification_locations[];
  selectednotiflocation!: notification_locations;

  missed_dose_option: missed_dose_notif[];
  selectedmissed_dose_option!: missed_dose_notif;

  timefornotification: timefornotif[];
  selectedtimefornotification!: timefornotif;

  notifemail!: string;
  notifphone!: string;
  notifdevice!: string;
  SuccessVisible = false;

  constructor(private http: HttpClient) {

    this.notifilocations_list = [
      { name: "Dispensing Device" },
      { name: "Email" },
      { name: "Text" },
    ];

    this.missed_dose_option = [{ name: "Enable" }, { name: "Disable" }];

    this.timefornotification = [
      { name: "5 minutes"},
      { name: "10 minutes" },
      { name: "15 minutes" },
    ];

    Settings_info = [];
  }

  ngOnInit(): void {
    this.http.get("https://www.rxmind.tech/settings").subscribe((data: any) => {
      console.log(data);

      //Check the missedDose selection - enable or disable
      //Update the UI value and save locally
      //Extract data for enabling/disabling the missed dose notifications
      if(data.missedDose == true){
        this.selectedmissed_dose_option = {name: "Enable"};
        Settings_info[0] = data.missedDose;
      }

      if(data.missedDose == false){
        this.selectedmissed_dose_option = {name: "Disable"};
        Settings_info[0]= data.missedDose;
      }

      //Check and save the notifcation location
      if (data.deviceNotif == true) {
        this.selectednotiflocation = {name: "Dispensing Device"};
        Settings_info[1] = data.deviceNotif;
      }

      //Select values in the notification location multiselect
      if (data.emailNotif != null) {
        this.selectednotiflocation = {name: "Email"};
        this.notifemail = data.emailNotif;
      }

      if (data.textNotif != null) {
        this.selectednotiflocation = {name:"Text"};
        this.notifphone = data.textNotif;
      }

      //Update the notification time dropdown and save the value 
      if (data.timeForNotif == "5min" || data.timeForNotif == "5 minutes"  ) {
        this.selectedtimefornotification = {name: "5 minutes"};
        Settings_info[2] = data.timeforNotif;
      }

      if (data.timeForNotif == "10min" || data.timeForNotif == "10 minutes") {
        this.selectedtimefornotification = {name: "10 minutes"};
        Settings_info[2] = data.timeforNotif;
      }

      if(data.timefornotif == "15min" || data.timeForNotif == "15 minutes"){
        this.selectedtimefornotification = {name: "15 minutes"};
        Settings_info[2] = data.timeforNotif;
      }

      console.log("Finished parsing all data on initialization");
    });
  }

  onSave() {
    //Gather all of the data placed in the view
    
    //Missed Dose selection
    if(this.selectedmissed_dose_option == {name: "Enable"}){
      Settings_info[0] = true;
    }
    if(this.selectedmissed_dose_option == {name: "Disable"}){
      Settings_info[0] = false;
    }

    //Notification Location Selection
    if(this.selectednotiflocation == {name: "Dispensing Device"}){
      Settings_info[1] = true;
    }

    if(this.selectedtimefornotification == {name: "5 minutes"}){
      Settings_info[2] = "5min";
    }

    if(this.selectedtimefornotification == {name:"10 minutes"})
    {
      Settings_info[2] = "10min";
    }

    if(this.selectedtimefornotification == {name:"15 minutes"}){
      Settings_info[2] = "15min";
    }

    //Send to the web server to parse and save
    this.http.post("https://www.rxmind.tech/settings",{
      missedDose: Settings_info[0],
      deviceNotif: Settings_info[1],
      emailNotif: this.notifemail,
      textNotif: this.notifphone,
      timeForNotif: Settings_info[2],
    })

    .subscribe((data) => {
      console.log(data);
     })
    console.log("Posted data in the web server");
    this.SuccessVisible = true;
  }
}
