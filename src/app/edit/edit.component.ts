import { Component, OnInit } from '@angular/core';

//Frequency of Dosage
interface dose_frequency{
  frequency : string;
}


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  dosefreq_list : dose_frequency[];
  selected_dosefreq !: dose_frequency;

  constructor() { 
    this.dosefreq_list = [
      {frequency: "Once a Day"},
      {frequency: "Twice a Day"},
      {frequency: "Three times a Day"},
      {frequency: "On Demand"}];

  }

  ngOnInit(): void {
  }

}
