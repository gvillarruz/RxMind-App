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
var AddMedication: any[];

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
      {name: " "},
      {name: " "},
      {name: " "}];

    Medication1_info = [];
    Medication2_info = [];
    Medication3_info = [];
    AddMedication = [];
  }

  ngOnInit(): void {
    //Call the login command to get the names of the medications
    this.http.post("https://www.rxmind.tech/login", {
      usename: "admin",
      password: "admin",
    })
    .subscribe((data: any) => {

    console.log("Getting the medication names");
      var nmeds = data.medications.length;
        if(nmeds >= 1){
        Medication1_info[0] = data.medications[0].name;
        this.medication_list[0].name = data.medications[0].name;

          if(nmeds >=2){
            Medication2_info[0] = data.medications[1].name;
            this.medication_list[1].name = data.medications[1].name;
            
            if(nmeds == 3){
              Medication3_info[0] = data.medication[2].name;
              this.medication_list[2].name = data.medications[2].name;
            }
          }
        }
        console.log(data);
        console.log("End of login subscribe in edit page init");
      });

      /*
    //Then use the read command on /crud to get the medication's information  
    this.http.post("https://www.rxmind.tech/crud",{
      type: "read",
      payload: {
        name: Medication1_info[0]}
    })
    .subscribe((data: any) => {
      console.log(data);
      var med1freq = data.medications[0].timesTaken.length;
      //Get the frequency of the dosage
      Medication1_info[1] = data.medications[0].timesTaken.length;
      //Get the amount of medication per dose 
      Medication1_info[2] = data.medications[0].pillsPerDose;
      //Save the cabinetid of the medication
      //Medication1_info[3] = data.medications[0]._______;
      //Save the amount of pills per medication - amount of pills left 
      Medication1_info[4] = data.medications[0].pillsAdded;

      //Save the number of times the medication is taken - Dispense times 
      if(med1freq >= 1){
        //Get the first frequency entry
        Medication1_info[5] = data.medications[0].timesTaken[0];
        if(med1freq >=2){
          //Get the second frequency entry
          Medication1_info[6] = data.medications[0].timesTaken[1];
          if(med1freq == 3){
            //Get the third frequency entry
            Medication1_info[7] = data.medications[0].timesTaken[2];
          }
        }
      }
      console.log("End of edit page read in edit page init");
    });*/
   
    /*
    //Get the frequency of the dosage
    Medication2_info[1] = data.medications[1].timesTaken.length;
    //Medication3_info[1] = data.medications[2].timesTaken.length;
    
    //Save the amount of medication per dose
    Medication2_info[2] = data.medications[1].pillsPerDose;
    //Medication3_info[2] = data.medications[2].________;
      */
    /*//Save the cabinet ID of the medication
    Medication1_info[3] = data.medications[0]._______;
    Medication2_info[3] = data.medications[1].________;
   // Medication3_info[3] = data.medications[2].________;*/

    /*/Save the amount of pills per medication - the amount of pills left 
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
  //});

  }

  onSelect(medication: medication) : void{
    //The medication input argument is the medication that was selected by the user
    this.selectedmedication = medication;

    //Find the medication array that matches the selected medication name 
    if(medication == Medication1_info[0]){
      //Load the UI with medication, using the read call to the web server
      this.http.post("https://www.rxmind.tech/crud",{
      type: "read",
      payload: {
        name: Medication1_info[0]}
      })
      .subscribe((data: any) => {
        console.log(data);
        //Get the frequency of the dosage
        var med1freq = data.medication[0].timesDaily;
        Medication1_info[1] = data.medications[0].timesDaily;
        //Get the amount of medication per dose 
        Medication1_info[2] = data.medications[0].pillsPerDose;
        //Save the cabinetid of the medication
        //Medication1_info[3] = data.medications[0]._______;
        //Save the amount of pills per medication - amount of pills left 
        Medication1_info[4] = data.medications[0].pillsAdded;

        //Save the number of times the medication is taken - Dispense times 
        if(med1freq >= 1){
          //Get the first frequency entry
          Medication1_info[5] = data.medications[0].dispenseTimes[0];
          if(med1freq >=2){
            //Get the second frequency entry
            Medication1_info[6] = data.medications[0].dispenseTimes[1];
            if(med1freq == 3){
              //Get the third frequency entry
              Medication1_info[7] = data.medications[0].dispenseTimes[2];
            }
          }
        }
        console.log("Gathered all associated medication information, loading into the UI");
      });

      //Load the UI with the data in the medication1_info array
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
      
      else if(Medication1_info[2] ==2){
        this.selected_medperdose = {amount:"Two Pills"};}

      //Load the cabinet id
      //this.cabinetid = Medication1_info[3]

      //Load the amount of pills left 
      this.pillsadded= Medication1_info[4];

      //Load the text fields with the dispense times 
      var med1freq = Medication1_info[1];
      if(med1freq >= 1){
        //Load the first frequency entry
        this.dispense1 = Medication1_info[5];
        if(med1freq >=2){
          //Load the second frequency entry
          this.dispense2 = Medication1_info[6];
          if(med1freq == 3){
            //Load the third frequency entry
            this.dispense3 = Medication1_info[7];
          }
        }
      }
    }
    else if(medication == Medication2_info[0]){
      //Load the UI with the data in the medication2 array (same approach as above)
        this.http.post("https://www.rxmind.tech/crud",{
        type: "read",
        payload: {
          name: Medication2_info[0]}
        })
        .subscribe((data: any) => {
          console.log(data);
          //Get the frequency of the dosage
          var med2freq = data.medication[0].timesDaily;
          Medication2_info[1] = data.medications[0].timesDaily;
          //Get the amount of medication per dose 
          Medication2_info[2] = data.medications[0].pillsPerDose;
          //Save the cabinetid of the medication
          //Medication2_info[3] = data.medications[0]._______;
          //Save the amount of pills per medication - amount of pills left 
          Medication2_info[4] = data.medications[0].pillsAdded;
  
          //Save the number of times the medication is taken - Dispense times 
          if(med2freq >= 1){
            //Get the first frequency entry
            Medication2_info[5] = data.medications[0].dispenseTimes[0];
            if(med2freq >=2){
              //Get the second frequency entry
              Medication2_info[6] = data.medications[0].dispenseTimes[1];
              if(med2freq == 3){
                //Get the third frequency entry
                Medication2_info[7] = data.medications[0].dispenseTimes[2];
              }
            }
          }
          console.log("Gathered all associated medication information, loading into the UI");
        });
  
        //Load the UI with the data in the medication1_info array
        //Load frequency of dosage 
        if(Medication2_info[1] == 1){
          this.selected_dosefreq = {frequency: "Once a Day"};}
  
        else if(Medication2_info[1] == 2){
          this.selected_dosefreq = {frequency:"Twice a Day"};}
  
        else if(Medication2_info[1] == 3){
          this.selected_dosefreq = {frequency:"Three times a Day"};}
  
        //Load the number of pills per dose 
        if(Medication2_info[2] == 1){
          this.selected_medperdose = {amount: "Single Pill"}; }
        
        else if(Medication2_info[2] ==2){
          this.selected_medperdose = {amount:"Two Pills"};}
  
        //Load the cabinet id
        //this.cabinetid = Medication2_info[3]
  
        //Load the amount of pills left 
        this.pillsadded= Medication2_info[4];
  
        //Load the text fields with the dispense times 
        var med2freq = Medication2_info[1];
        if(med2freq >= 1){
          //Load the first frequency entry
          this.dispense1 = Medication2_info[5];
          if(med2freq >=2){
            //Load the second frequency entry
            this.dispense2 = Medication2_info[6];
            if(med2freq == 3){
              //Load the third frequency entry
              this.dispense3 = Medication2_info[7];
            }
          }
        }
      }

     else if(medication == Medication3_info[0]){
      //Load the UI with the data in the medication2 array (same approach as above)
        this.http.post("https://www.rxmind.tech/crud",{
          type: "read",
          payload: {
            name: Medication3_info[0]}
          })
          .subscribe((data: any) => {
            console.log(data);
            //Get the frequency of the dosage
            var med3freq = data.medication[0].timesDaily;
            Medication3_info[1] = data.medications[0].timesDaily;
            //Get the amount of medication per dose 
            Medication3_info[2] = data.medications[0].pillsPerDose;
            //Save the cabinetid of the medication
            //Medication3_info[3] = data.medications[0]._______;
            //Save the amount of pills per medication - amount of pills left 
            Medication3_info[4] = data.medications[0].pillsAdded;
    
            //Save the number of times the medication is taken - Dispense times 
            if(med3freq >= 1){
              //Get the first frequency entry
              Medication3_info[5] = data.medications[0].dispenseTimes[0];
              if(med3freq >=2){
                //Get the second frequency entry
                Medication3_info[6] = data.medications[0].dispenseTimes[1];
                if(med3freq == 3){
                  //Get the third frequency entry
                  Medication3_info[7] = data.medications[0].dispenseTimes[2];
                }
              }
            }
            console.log("Gathered all associated medication information, loading into the UI");
          });
  
          //Load the UI with the data in the medication1_info array
          //Load frequency of dosage 
          if(Medication3_info[1] == 1){
            this.selected_dosefreq = {frequency: "Once a Day"};}
    
          else if(Medication3_info[1] == 2){
            this.selected_dosefreq = {frequency:"Twice a Day"};}
    
          else if(Medication3_info[1] == 3){
            this.selected_dosefreq = {frequency:"Three times a Day"};}
  
          //Load the number of pills per dose 
          if(Medication3_info[2] == 1){
            this.selected_medperdose = {amount: "Single Pill"}; }
          
          else if(Medication3_info[2] ==2){
            this.selected_medperdose = {amount:"Two Pills"};}
    
          //Load the cabinet id
          //this.cabinetid = Medication3_info[3]
    
          //Load the amount of pills left 
          this.pillsadded= Medication3_info[4];
    
          //Load the text fields with the dispense times 
          var med3freq = Medication3_info[1];
          if(med3freq >= 1){
            //Load the first frequency entry
            this.dispense1 = Medication3_info[5];
            if(med3freq >=2){
              //Load the second frequency entry
              this.dispense2 = Medication3_info[6];
              if(med3freq == 3){
                //Load the third frequency entry
                this.dispense3 = Medication3_info[7];
              }
            }
          }
        }

    }

  saveMedication(){
    //Check if there is an add or a save operation from the user 
    if(this.addmedicine == null){
      //Gather all of the UI data, and send it to the server
      //Get the medication name
      AddMedication[0] = this.selectedmedication;

      //Get the frequency of dosage 
      if(this.selected_dosefreq == {frequency: "Once a Day"}){
        AddMedication[1] = 1; }
      if(this.selected_dosefreq == {frequency: "Twice a Day"}){
        AddMedication[1] = 2; }
      if(this.selected_dosefreq == {frequency: "Three times a Day"}){
        AddMedication[1] = 3; }
        
      //Get the selected amount of medication per dose 
      if(this.selected_medperdose == {amount:"Single Pill"}){
        AddMedication[2] = 1; }
      else if (this.selected_medperdose == {amount:"Two Pills"}){
        AddMedication[2] = 2; }
      
      //Get the cabinet id
      AddMedication[3] = this.cabinetid;

      //Get the Number of pills added 
      AddMedication[4] = this.pillsadded;

      //Get the dispensing frequency -based off the dose freq variable
      if(AddMedication[1] == 1){
        AddMedication[5] = this.dispense1; }

      else if(AddMedication[1] == 2){
        AddMedication[5] = this.dispense1;
        AddMedication[6] = this.dispense2; }

      else if(AddMedication[1] == 3){
        AddMedication[5] = this.dispense1;
        AddMedication[6] = this.dispense2;
        AddMedication[7] = this.dispense3; }

      //Send the new data to the server with the 'add' tag
      this.http.post("https://www.rxmind.tech/crud",{
        type:"add",
        payload: {
          name: AddMedication[0],
          timesDaily: AddMedication[1],
          dispenseTimes: [AddMedication[5], AddMedication[6], AddMedication[7]],
          pillsadded : AddMedication[4],
          pillsPerDose: AddMedication[2],
          cabinetNo: AddMedication[3] }
      })
      .subscribe((data: any) => {
        if(data == '201 Created' || data == "Success"){
          console.log(data);
        //Look for an empty Medicationx_info array and save the AddMedication[] information into it 
      }
      });
    }
    
    else if(this.addmedicine != null){
      //If this is a save request 
      //Figure out which medication is the one selected 
      if(this.selectedmedication == Medication1_info[0]){
        //Update the array with the new info
        //Send the updated object to the web server

      }
      else if(this.selectedmedication == Medication2_info[0]){

      }
      else if(this.selectedmedication == Medication3_info[0]){

      }

    }
 
    //wait for a success response from the web server & display success to user

    console.log("End of the saveMedication btn function");
  }

  removeMedication(){
    //Take the medication data in all of the form fields, package it into an object
    //Send the data to the web server to remove
    this.http
    .post("https://www.rxmind.tech/crud", {
      type: "delete",
      payload: {
        name: this.selectedmedication
    }})
    .subscribe((data) => {
      console.log(data);
      console.log("Deleted the medication {0}", this.selectedmedication);
    });
  }

}
