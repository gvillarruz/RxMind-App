import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

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

  addmedicine!: string;

  constructor(private http: HttpClient) { 
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
      {name: "Medicine 2"},];
  }

  ngOnInit(): void {
    console.log("Initialized the add or edit page");
  }

  onSelect(medication: medication) : void{
    this.selectedmedication = medication;
    //the user selects a medication
    //load the associated medication metadata into the form fields
  }

  saveMedication(){
    //take the data in all of the form fields, package it into an object
    //send the data to save in the web server 
    //wait for a success response from the web server & display success to user
    this.http
    .post("https://www.rxmind.tech/crud", {
      type: "add",
      payload: {
        name: "Levothyroxine",
        timesDaily: 2,
        dispenseTimes: ["12:00PM", "4:00PM"],
        pillsAdded: 50,
        pillsPerDose: 1
    }})
    .subscribe((data) => {
      console.log(data);
    });

    //Differentiate between adding a new medication and saving a current one 
    console.log("End of the saveMedication btn function");
  }

  removeMedication(){
    //Take the medication data in all of the form fields, package it into an object
    //Send the data to the web server to remove
    this.http
    .post("https://www.rxmind.tech/crud", {
      type: "delete",
      payload: {
        name: "Levothyroxine"
    }})
    .subscribe((data) => {
      console.log(data);
    });
  }

}
