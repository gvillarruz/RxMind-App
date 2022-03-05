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

var Medication_info: any[];

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
      {frequency: "Three times a Day"}];

    this.med_per_dose_list = [
      {amount: "Single Pill"},
      {amount: "Two Pills"}];

    this.medication_list = [
      {name: "Medicine 1"},
      {name: "Medicine 2"},];

    Medication_info = [];
  }

  ngOnInit(): void {
    console.log("Initialized the add or edit page");
    /*this.http.get("https://www.rxmind.tech/crud").subscribe((data: any) => {

  });*/
  }

  onSelect(medication: medication) : void{
    this.selectedmedication = medication;
    //the user selects a medication
    //load the associated medication metadata into the form fields
  }

  saveMedication(){
    //Check if there is an add or a save operation from the user 
    if(this.addmedicine != null){
      //There is an add function that must undergo
      //Gather all of the data in the UI fields and send to the web server through a post call 

      //Gather data for the dose frequency variable
      if(this.selected_dosefreq == {frequency: "Once a Day"}){
        Medication_info[0] = 1;
      }
      
      if(this.selected_dosefreq == {frequency: "Twice a Day"}){
        Medication_info[0] = 2;
      }

      if(this.selected_dosefreq == {frequency: "Three times a Day"}){
        Medication_info[0] = 3;
      }
      
      //Gather data for the 
      
      /*.post("https://www.rxmind.tech/crud",{
        type: "add",
        payload: {
          name: this.addmedicine,
          
        }
      })*/

    }
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
