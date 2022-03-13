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

var Medication1_info: any[];
var Medication2_info: any[];
var Medication3_info: any[];

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
  pillsadded: any

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
      //{name: "Medicine 3"}];

    Medication1_info = [];
    Medication2_info = [];
    Medication3_info = [];
  }

  ngOnInit(): void {



    /*this.http.post("https://www.rxmind.tech/login", {
      username: "admin",
      password: "admin",
    })*/
    //this.http.post("https://www.rxmind.tech/crud",{})
    this.http.get("https://www.rxmind.tech/crud").subscribe((data: any) => {
      //.subscribe((data: any) => {

   // .subscribe((data: any) => {
      console.log(data);
  
    //this.http.get("https://www.rxmind.tech/login").subscribe((data: any) => {

     //Take in the medication names from the web server and populate them in the arrays
      Medication1_info[0] = data.medications[0].name;
      this.medication_list[0].name = data.medications[0].name; //Loading the UI elements
      Medication2_info[0] = data.medications[1].name;
      this.medication_list[1].name = data.medications[1].name;
      //Medication3_info[0] = data.medications[2].name;
    
    //Get the frequency of the dosage
    Medication1_info[1] = data.medications[0].timesTaken.length;
    Medication2_info[1] = data.medications[1].timesTaken.length;
    //Medication3_info[1] = data.medications[2].timesTaken.length;
    
    //Save the amount of medication per dose
    Medication1_info[2] = data.medications[0].pillsPerDose;
    Medication2_info[2] = data.medications[1].pillsPerDose;
    //Medication3_info[2] = data.medications[2].________;

    /*//Save the cabinet ID of the medication
    Medication1_info[3] = data.medications[0]._______;
    Medication2_info[3] = data.medications[1].________;
   // Medication3_info[3] = data.medications[2].________;*/

    //Save the amount of pills per medication - the amount of pills left 
    Medication1_info[4] = data.medications[0].pillsAdded;
    Medication2_info[4] = data.medications[1].pillsAdded;
    //Medication3_info[4] = data.medications[2].________;

    //Save the number of times taken - Dispense times
    let count=0;
    for(let i=2; i < data.medications[0].timesTaken.length; i++){
      Medication1_info[i] = data.medications[0].timesTaken[count];
      count = count+1;
    }
    
    count=0;
    for(let i=2; i < data.medications[1].timesTaken.length; i++){      
      Medication2_info[i] = data.medications[1].timesTaken[count];
      count = count+1;
    }

    /* Getting for medication 3 - med 3 will not be used during the demo 
    int j =0;
    for(let i=2; i < data.medications[2].timesTaken.length; i++){      
      Medication3_info[i] = data.medications[2].timesTaken[j];
      j = j+1;
    }*/
  });

  }

  onSelect(medication: medication) : void{
    //The medication input argument is the medication that was selected by the user
    this.selectedmedication = medication;

    //Find the medication array that matches the selected medication name 
    if(medication == Medication1_info[0]){
      //Load the UI with the data in the medication1 array
      //Load frequency of dosage 
      if(Medication1_info[1] == 1){
        this.selected_dosefreq = {frequency: "Once a Day"};}

      else if(Medication1_info[1] == 2){
        this.selected_dosefreq = {frequency:"Twice a Day"};}

      else if(Medication1_info[1] == 3){
        this.selected_dosefreq = {frequency:"Three times a Day"};}

      //Load the number of pills per dose 
      if(Medication1_info[2] == 1){
        this.selected_medperdose = {amount: "Single Pill"}; }
      
      else if(Medication1_info[2]==2){
        this.selected_medperdose = {amount:"Two Pills"};}

      //Load the cabinet id
      //this.cabinetid = Medication1_info[3]

      //Load the amount of pills left 
      this.pillsadded= Medication1_info[4];

      //Load the text fields with the dose frequency
      //Check each index of the Medication1_info indexes
      //if(Medication1_info)


      /*var j=0;
      for(let i=2; i < Medication1_info[1]; i++){
        //Medication1_info[i] = data.medications[0].timesTaken[j];
        j = j+1;
      }*/
    }
    else if(medication == Medication2_info[0]){
      //Load the UI with the data in the medication2 array 
    }
  }

  saveMedication(){
    //Check if there is an add or a save operation from the user 
    if(this.addmedicine != null){
      //There is an add function that must undergo
      //Gather all of the data in the UI fields and send to the web server through a post call 

      //Gather data for the dose frequency variable
      if(this.selected_dosefreq == {frequency: "Once a Day"}){
        Medication1_info[0] = 1;
      }
      
      if(this.selected_dosefreq == {frequency: "Twice a Day"}){
        Medication1_info[0] = 2;
      }

      if(this.selected_dosefreq == {frequency: "Three times a Day"}){
        Medication1_info[0] = 3;
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
        pillsAdded: 40,
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
        name: "Advil"
    }})
    .subscribe((data) => {
      console.log(data);
    });
  }

}
