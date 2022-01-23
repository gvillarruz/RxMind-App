import { Component, OnInit } from '@angular/core';

interface notification_locations{
  name : string;
}


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})

export class SettingsComponent implements OnInit{

notifilocations_list : notification_locations[];
selectednotiflocation!: notification_locations;

  constructor() { 

    this.notifilocations_list = [
      { name: "Dispensing Device"},
      {name: "Email"},
      {name: "Text"} ];

   }

  ngOnInit(): void {
  }

}

