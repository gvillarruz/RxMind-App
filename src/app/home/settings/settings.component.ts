import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MessageService } from "primeng/api";

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
  providers: [MessageService],
})
export class SettingsComponent implements OnInit {
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
  nomisseddosetimeselected = false;

  deviceNotif: boolean;
  emailNotif: boolean;
  textNotif: boolean;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {
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

      this.deviceNotif = data.deviceNotif;
      this.emailNotif = data.emailNotif;
      this.textNotif = data.textNotif;

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
      if (
        data.timeForNotif == "5min" ||
        data.timeForNotif == "5 minutes" ||
        data.timeForNotif == "5"
      ) {
        this.selectedtimefornotification = { name: "5 minutes" };
        Settings_info[4] = data.timeForNotif;
      }

      if (
        data.timeForNotif == "10min" ||
        data.timeForNotif == "10 minutes" ||
        data.timeForNotif == "10"
      ) {
        this.selectedtimefornotification = { name: "10 minutes" };
        Settings_info[4] = data.timeForNotif;
      }

      if (
        data.timefornotif == "15min" ||
        data.timeForNotif == "15 minutes" ||
        data.timeForNotif == "15"
      ) {
        this.selectedtimefornotification = { name: "15 minutes" };
        Settings_info[4] = data.timeForNotif;
      }

      console.log("Settings Page: Finished parsing all data on initialization");
    });
  }

  onCheckboxClick(e: any) {
    // // console.log(e.target.checked);
    // // console.log(e.target.value);
    // if (e.target.checked) {
    //   if (e.target.value == "1") {
    //     //Save the fact that the dispensing device has been selected
    //     Settings_info[1] = true;
    //     console.log("Dispensing device selected");
    //     this.SuccessVisible = false;
    //   } else if (e.target.value == "2") {
    //     //Email notification has been selected
    //     Settings_info[2] = true;
    //     this.SuccessVisible = false;
    //     console.log("Email notification selected");
    //   } else if (e.target.value == "3") {
    //     //Text message notification has been selected
    //     Settings_info[3] = true;
    //     console.log("Text message notification selected");
    //     this.SuccessVisible = false;
    //   }
    // }
    // //If the checkbox is unchecked
    // else if (!e.target.checked) {
    //   if (e.target.value == "1") {
    //     //Dispensing device unselected
    //     Settings_info[1] = false;
    //     console.log("Dispensing device unselected");
    //     this.SuccessVisible = false;
    //   } else if (e.target.value == "2") {
    //     //Email notifications unselected
    //     Settings_info[2] = false;
    //     console.log("Email notification unselected");
    //     this.SuccessVisible = false;
    //   } else if (e.target.value == "3") {
    //     //Text message notifications unselected
    //     Settings_info[3] = false;
    //     console.log("Text notification unselected");
    //     this.SuccessVisible = false;
    //   }
    // }
  }

  onSave() {
    //Gather all of the data placed in the view
    //Ensure the notification location error (no values selected) is disabled
    this.notiferror = false;
    this.nomisseddosetimeselected = false;

    //Missed Dose selection
    if (this.selectedmissed_dose_option == { name: "Enable" }) {
      Settings_info[0] = true;
      console.log("Setting missed dose notifications to true");
      if (!Settings_info[1] || !Settings_info[2] || !Settings_info[3]) {
        //If there are no notification locations selected, tell the user to select a notification location
        this.notiferror = true;
        return;
      }
    }
    //The missed dose notifications are disabled
    if (this.selectedmissed_dose_option == { name: "Disable" }) {
      Settings_info[0] = false;
      console.log("Disabling missed dose notifications");
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
    if (
      Settings_info[0] == true &&
      (Settings_info[4] == undefined || Settings_info[4] == null)
    ) {
      //Show an error to the user
      this.nomisseddosetimeselected = true;
      console.log("Showing the missed dose notification warning");
      return;
    }
    console.log("Sending post to the web-server");

    //Send to the web server to parse and save
    this.http
      .post("https://www.rxmind.tech/settings", {
        missedDose: Settings_info[0],
        deviceNotif: this.deviceNotif,
        emailNotif: this.emailNotif,
        textNotif: this.textNotif,
        timeForNotif: Settings_info[4],
      })

      .subscribe((data: any) => {
        console.log(data);
        if (!data) {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: `Could not save settings to device`,
          });
        } else {
          this.SuccessVisible = true;
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: `Settings saved successfully at ${data.time}`,
          });
        }
      });
  }
}
