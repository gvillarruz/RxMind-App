import { Component, OnInit } from '@angular/core';

//Frequency of Dosage
interface dose_frequency{
  frequency : string;
}

//Amount of Medication Per Dose
interface med_per_dose{
  amount: string;
}

interface medication{
  name : string;
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  cabinetid: any
  dispense1: any
  dispense2: any
  dispense3: any

  dosefreq_list : dose_frequency[];
  selected_dosefreq !: dose_frequency;

  med_per_dose_list : med_per_dose[];
  selected_medperdose !: med_per_dose;

  medication_list : medication[];
  selectedmedication? :medication;

  onSelect(medication: medication) : void{
    this.selectedmedication = medication;
    //the user selects a medication
    //load the associated medication metadata into the form fields
  }

  saveMedication(){
    //take the data in all of the form fields, package it into an object
    //send the data to save in the web server 
    //wait for a success response from the web server & display success to user
  }

  removeMedication(){
    //Take the medication data in all of the form fields, package it into an object
    //Send the data to the web server to remove 
  }

  constructor() { 
    this.dosefreq_list = [
      {frequency: "Once a Day"},
      {frequency: "Twice a Day"},
      {frequency: "Three times a Day"},
      {frequency: "On Demand"}];

    this.med_per_dose_list = [
      {amount: "Single Pill"},
      {amount: "Two Pills"}];

    this.medication_list = [
      {name: "Medicine 1"},
      {name: "Medicine 2"},
      {name: "Medicine 3"}];

  }

  ngOnInit(): void {
  }

}
