import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

//To Enable/Disable missed dose notifications
interface missed_dose_notif {
  name: string;
}

//To select time period between missed dose and notification
interface timefornotif {
  name: string;
}

//To save any local variables to recive and send from the web server
let Settings_info: any[];

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"],
})
export class SettingsComponent implements OnInit {
  //List that is used for checkboxes for device notification location
  optionList: any = [
    { id: 1, name: "Dispensing Device" },
    { id: 2, name: "Email" },
    { id: 3, name: "Text Message" },
  ];

  missed_dose_option: missed_dose_notif[];
  selectedmissed_dose_option!: missed_dose_notif;
  selectedmissted_dose_option: string[] = [];

  timefornotification: timefornotif[];
  selectedtimefornotification!: timefornotif;

  notifemail!: string;
  notifphone!: string;
  notifdevice!: string;
  SuccessVisible = false;
  notiferror = false;
  fieldsnotfilled = false;

  constructor(private http: HttpClient) {
    this.missed_dose_option = [{ name: "Enable" }, { name: "Disable" }];

    this.timefornotification = [
      { name: "5 minutes" },
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
      if (data.missedDose == true) {
        this.selectedmissed_dose_option = { name: "Enable" };
        Settings_info[0] = data.missedDose;
      }

      if (data.missedDose == false) {
        this.selectedmissed_dose_option = { name: "Disable" };
        Settings_info[0] = data.missedDose;
      }

      //Save the notifcation location
      if (data.deviceNotif == true) {
        Settings_info[1] = data.deviceNotif;
      }

      if (data.emailNotif != null) {
        this.notifemail = data.emailNotif;
        Settings_info[2] = true;
        //There is email notif information
      }

      if (data.textNotif != null) {
        this.notifphone = data.textNotif;
        Settings_info[3] = true;
        //There is text msg notif information
      }

      //Update the notification time dropdown and save the value
      if (data.timeForNotif == "5min" || data.timeForNotif == "5 minutes") {
        this.selectedtimefornotification = { name: "5 minutes" };
        Settings_info[4] = data.timeforNotif;
      }

      if (data.timeForNotif == "10min" || data.timeForNotif == "10 minutes") {
        this.selectedtimefornotification = { name: "10 minutes" };
        Settings_info[4] = data.timeforNotif;
      }

      if (data.timefornotif == "15min" || data.timeForNotif == "15 minutes") {
        this.selectedtimefornotification = { name: "15 minutes" };
        Settings_info[4] = data.timeforNotif;
      }

      console.log("Settings Page: Finished parsing all data on initialization");
    });
  }

  onCheckboxClick(e: any) {
    // console.log(e.target.checked);
    // console.log(e.target.value);
    if (e.target.checked) {
      if (e.target.value == "1") {
        //Save the fact that the dispensing device has been selected
        Settings_info[1] = true;
        console.log("Dispensing device selected");
      } else if (e.target.value == "2") {
        //Email notification has been selected
        Settings_info[2] = true;
        console.log("Email notification selected");
      } else if (e.target.value == "3") {
        //Text message notification has been selected
        Settings_info[3] = true;
        console.log("Text message notification selected");
      }
    }
    //If the checkbox is unchecked
    else if (!e.target.checked) {
      if (e.target.value == "1") {
        //Dispensing device unselected
        Settings_info[1] = false;
        console.log("Dispensing device unselected");
      } else if (e.target.value == "2") {
        //Email notifications unselected
        Settings_info[2] = false;
        console.log("Email notification unselected");
      } else if (e.target.value == "3") {
        //Text message notifications unselected
        Settings_info[3] = false;
        console.log("Text notification unselected");
      }
    }
  }

  onSave() {
    //Gather all of the data placed in the view
    //Ensure the notification location error (no values selected) is disabled
    this.notiferror = false;
    this.fieldsnotfilled = false;

    //Missed Dose selection
    if (this.selectedmissed_dose_option == { name: "Enable" }) {
      Settings_info[0] = true;
      if (!Settings_info[1] || !Settings_info[2] || !Settings_info[3]) {
        //If there are no notification locations selected
        this.notiferror = true;
        return;
      }
    }
    //The missed dose notifications are disabled
    if (this.selectedmissed_dose_option == { name: "Disable" }) {
      Settings_info[0] = false;
    }

    //Notification location gathering has been handled in the onCheckboxClick() event

    if (this.selectedtimefornotification == { name: "5 minutes" }) {
      Settings_info[2] = "5min";
    }

    if (this.selectedtimefornotification == { name: "10 minutes" }) {
      Settings_info[2] = "10min";
    }

    if (this.selectedtimefornotification == { name: "15 minutes" }) {
      Settings_info[2] = "15min";
    }

    //If missedDose is true, there should be a value defined for timeForNotif
    if(Settings_info[0] == true && (Settings_info[4] == undefined || Settings_info[4] == null)){
      //Show an error to the user 
      this.fieldsnotfilled = true;
      return;
    }

    //Send to the web server to parse and save
    this.http
      .post("https://www.rxmind.tech/settings", {
        missedDose: Settings_info[0],
        deviceNotif: Settings_info[1],
        emailNotif: this.notifemail,
        textNotif: this.notifphone,
        timeForNotif: Settings_info[4],
      })

      .subscribe((data) => {
        console.log(data);
      });
    console.log("Posted data in the web server");
    this.SuccessVisible = true;
  }
}
