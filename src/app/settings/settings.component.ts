import { Component, OnInit } from '@angular/core';

interface notification_locations{
  name : string;
}

interface missed_dose_notif{
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


  constructor() { 

    this.notifilocations_list = [
      { name: "Dispensing Device"},
      {name: "Email"},
      {name: "Text"} ];

    this.missed_dose_option = [
      {name: "Enable"},
      {name: "Disable"}];

   }

  ngOnInit(): void {
  }

}

