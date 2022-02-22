import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { _DisposeViewRepeaterStrategy } from '@angular/cdk/collections';
import {MultiSelectModule} from 'primeng/multiselect';

//Notification and Reminder Location
interface notification_locations{
  name : string;
}

//To Enable/Disable missed dose notifications
interface missed_dose_notif{
  name: string;
}

//To select time period between missed dose and notification
interface timefornotif{
  name: string;
}

interface emailtextnotif{
  name : string;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})

export class SettingsComponent implements OnInit{

notifilocations_list : notification_locations[];
selectednotiflocation!: notification_locations[];

missed_dose_option : missed_dose_notif[];
selectedmissed_dose_option !: missed_dose_notif;

timefornotification : timefornotif[];
selectedtimefornotification !: timefornotif;

notifemail !: emailtextnotif;
notifphone !: emailtextnotif;

  constructor(private http: HttpClient) { 

    this.notifilocations_list = [
      {name: "Dispensing Device"},
      {name: "Email"},
      {name: "Text"} ];

    this.missed_dose_option = [
      {name: "Enable"},
      {name: "Disable"}];

    this.timefornotification = [
      {name: "15 minutes"},
      {name: "30 minutes"},
      {name: "60 minutes"}];

   }

  ngOnInit(): void {
    this.http
    .get("https://www.rxmind.tech/settings")
    .subscribe((data:any) => {

      //Select values in the notification location multiselect
      /*if(data.emailNotif != null){
        //this.selectednotiflocation[2] = select;
        this.notifemail.name = data.emailNotif;
        console.log("Seting email");
        //console.log(this.selectednotiflocation[2]);
      }
      if(data.deviceNotif == true){
        //this.selectednotiflocation.name = "Device";
        //console.log(this.selectednotiflocation[1]);
      }
      if(data.textNotif != null){
        //this.selectednotiflocation[3];
        this.notifphone.name = data.textNotif;
        console.log("Setting text number");
      }
    
      this.selectedmissed_dose_option = data.missedDose;
      */
      console.log(data);
    });

  }

  onSave(){
    //Gather all of the data placed in the view
    //Send to the web server to parse and save 
    this.http
    .post("https://www.rxmind.tech/settings", {
      missedDose: this.selectedmissed_dose_option.name,
      deviceNotif: this.selectednotiflocation[1],
      emailNotif: this.notifemail,
      textNotif: this.notifphone,
      timeForNotif: this.selectedtimefornotification
    })

      

      /*missedDose: "true",this.selectedmissed_dose_option.name,
      deviceNotif: "true",
      emailNotif: "gvillarruz@ryerson.ca", //null to disable
      textNotif: 6476873576,
      timeForNotif: "5min"*/ 
      
    .subscribe((data) => {
      console.log(data);
    });

  }

}

