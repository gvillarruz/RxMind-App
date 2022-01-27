import { Component, OnInit } from '@angular/core';

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

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})

export class SettingsComponent implements OnInit{

notifilocations_list : notification_locations[];
selectednotiflocation!: notification_locations;

missed_dose_option : missed_dose_notif[];
selectedmissed_dose_option !: missed_dose_notif;

timefornotification : timefornotif[];
selectedtimefornotification !: timefornotif;


  constructor() { 

    this.notifilocations_list = [
      { name: "Dispensing Device"},
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
  }

}

