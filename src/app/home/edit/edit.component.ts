import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HomeService } from "../../home.service";

//Frequency of Dosage
interface dose_frequency {
  frequency: string;
}

//Amount of Medication Per Dose
interface med_per_dose {
  amount: string;
}

interface medication {
  name: string;
}

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"],
})
export class EditComponent implements OnInit {
  cabinetid: any;
  dispense1: any;
  dispense2: any;
  dispense3: any;
  pillsadded: any;

  dosefreq_list: dose_frequency[];
  selected_dosefreq!: dose_frequency;

  med_per_dose_list: med_per_dose[];
  selected_medperdose!: med_per_dose;

  medication_list: medication[];
  selectedmedication?: medication;

  addmedicine!: string;

  Medication1_info = [];
  Medication2_info = [];
  Medication3_info = [];
  AddMedication = [];

  constructor(private http: HttpClient, private homeService: HomeService) {
    this.dosefreq_list = [
      { frequency: "Once a Day" },
      { frequency: "Twice a Day" },
      { frequency: "Three times a Day" },
    ];

    this.med_per_dose_list = [
      { amount: "Single Pill" },
      { amount: "Two Pills" },
    ];

    this.medication_list = [];

    this.medication_list = this.homeService.homeData.medications.map((med) => {
      return { name: med.name };
    });

    let nmeds = this.homeService.homeData.medications.length;
    if (nmeds >= 1) {
      this.Medication1_info[0] = this.homeService.homeData.medications[0].name;
      if (nmeds >= 2) {
        this.Medication2_info[0] =
          this.homeService.homeData.medications[1].name;
        if (nmeds == 3) {
          this.Medication3_info[0] =
            this.homeService.homeData.medications[2].name;
        }
      }
    }
  }

  ngOnInit(): void {
    /*
    //Then use the read command on /crud to get the medication's information  
    this.http.post("https://www.rxmind.tech/crud",{
      type: "read",
      payload: {
        name: this.Medication1_info[0]}
    })
    .subscribe((data: any) => {
      console.log(data);
      let med1freq = data.medications[0].timesTaken.length;
      //Get the frequency of the dosage
      this.Medication1_info[1] = data.medications[0].timesTaken.length;
      //Get the amount of medication per dose 
      this.Medication1_info[2] = data.medications[0].pillsPerDose;
      //Save the cabinetid of the medication
      //this.Medication1_info[3] = data.medications[0]._______;
      //Save the amount of pills per medication - amount of pills left 
      this.Medication1_info[4] = data.medications[0].pillsAdded;

      //Save the number of times the medication is taken - Dispense times 
      if(med1freq >= 1){
        //Get the first frequency entry
        this.Medication1_info[5] = data.medications[0].timesTaken[0];
        if(med1freq >=2){
          //Get the second frequency entry
          this.Medication1_info[6] = data.medications[0].timesTaken[1];
          if(med1freq == 3){
            //Get the third frequency entry
            this.Medication1_info[7] = data.medications[0].timesTaken[2];
          }
        }
      }
      console.log("End of edit page read in edit page init");
    });*/
    /*
    //Get the frequency of the dosage
    this.Medication2_info[1] = data.medications[1].timesTaken.length;
    //this.Medication3_info[1] = data.medications[2].timesTaken.length;
    
    //Save the amount of medication per dose
    this.Medication2_info[2] = data.medications[1].pillsPerDose;
    //this.Medication3_info[2] = data.medications[2].________;
      */
    /*//Save the cabinet ID of the medication
    this.Medication1_info[3] = data.medications[0]._______;
    this.Medication2_info[3] = data.medications[1].________;
   // this.Medication3_info[3] = data.medications[2].________;*/
    /*/Save the amount of pills per medication - the amount of pills left 
    this.Medication2_info[4] = data.medications[1].pillsAdded;
    //this.Medication3_info[4] = data.medications[2].________;

    //Save the number of times taken - Dispense times
    let count=0;
    for(let i=2; i < data.medications[0].timesTaken.length; i++){
      this.Medication1_info[i] = data.medications[0].timesTaken[count];
      count = count+1;
    }
    
    count=0;
    for(let i=2; i < data.medications[1].timesTaken.length; i++){      
      this.Medication2_info[i] = data.medications[1].timesTaken[count];
      count = count+1;
    }

    /* Getting for medication 3 - med 3 will not be used during the demo 
    int j =0;
    for(let i=2; i < data.medications[2].timesTaken.length; i++){      
      this.Medication3_info[i] = data.medications[2].timesTaken[j];
      j = j+1;
    }*/
    //});
  }

  onSelect(medication: medication): void {
    //The medication input argument is the medication that was selected by the user
    this.selectedmedication = medication;

    //Find the medication array that matches the selected medication name
    if (this.selectedmedication.name == this.Medication1_info[0]) {
      //Load the UI with medication, using the read call to the web server
      this.http
        .post("https://www.rxmind.tech/crud", {
          type: "read",
          payload: {
            name: this.Medication1_info[0],
          },
        })
        .subscribe((data: any) => {
          console.log(data);
          //Get the frequency of the dosage
          let med1freq = data.medication[0].timesDaily;
          this.Medication1_info[1] = data.medications[0].timesDaily;
          //Get the amount of medication per dose
          this.Medication1_info[2] = data.medications[0].pillsPerDose;
          //Save the cabinetid of the medication
          //this.Medication1_info[3] = data.medications[0]._______;
          //Save the amount of pills per medication - amount of pills left
          this.Medication1_info[4] = data.medications[0].pillsAdded;

          //Save the number of times the medication is taken - Dispense times
          if (med1freq >= 1) {
            //Get the first frequency entry
            this.Medication1_info[5] = data.medications[0].dispenseTimes[0];
            if (med1freq >= 2) {
              //Get the second frequency entry
              this.Medication1_info[6] = data.medications[0].dispenseTimes[1];
              if (med1freq == 3) {
                //Get the third frequency entry
                this.Medication1_info[7] = data.medications[0].dispenseTimes[2];
              }
            }
          }
          console.log(
            "Gathered all associated medication information, loading into the UI"
          );
        });

      //Load the UI with the data in the this.Medication1_info array
      //Load frequency of dosage
      if (this.Medication1_info[1] == 1) {
        this.selected_dosefreq = { frequency: "Once a Day" };
      } else if (this.Medication1_info[1] == 2) {
        this.selected_dosefreq = { frequency: "Twice a Day" };
      } else if (this.Medication1_info[1] == 3) {
        this.selected_dosefreq = { frequency: "Three times a Day" };
      }

      //Load the number of pills per dose
      if (this.Medication1_info[2] == 1) {
        this.selected_medperdose = { amount: "Single Pill" };
      } else if (this.Medication1_info[2] == 2) {
        this.selected_medperdose = { amount: "Two Pills" };
      }

      //Load the cabinet id
      //this.cabinetid = this.Medication1_info[3]

      //Load the amount of pills left
      this.pillsadded = this.Medication1_info[4];

      //Load the text fields with the dispense times
      let med1freq = this.Medication1_info[1];
      if (med1freq >= 1) {
        //Load the first frequency entry
        this.dispense1 = this.Medication1_info[5];
        if (med1freq >= 2) {
          //Load the second frequency entry
          this.dispense2 = this.Medication1_info[6];
          if (med1freq == 3) {
            //Load the third frequency entry
            this.dispense3 = this.Medication1_info[7];
          }
        }
      }
    } else if (this.selectedmedication.name == this.Medication2_info[0]) {
      //Load the UI with the data in the medication2 array (same approach as above)
      this.http
        .post("https://www.rxmind.tech/crud", {
          type: "read",
          payload: {
            name: this.Medication2_info[0],
          },
        })
        .subscribe((data: any) => {
          console.log(data);
          //Get the frequency of the dosage
          let med2freq = data.medication[0].timesDaily;
          this.Medication2_info[1] = data.medications[0].timesDaily;
          //Get the amount of medication per dose
          this.Medication2_info[2] = data.medications[0].pillsPerDose;
          //Save the cabinetid of the medication
          //this.Medication2_info[3] = data.medications[0]._______;
          //Save the amount of pills per medication - amount of pills left
          this.Medication2_info[4] = data.medications[0].pillsAdded;

          //Save the number of times the medication is taken - Dispense times
          if (med2freq >= 1) {
            //Get the first frequency entry
            this.Medication2_info[5] = data.medications[0].dispenseTimes[0];
            if (med2freq >= 2) {
              //Get the second frequency entry
              this.Medication2_info[6] = data.medications[0].dispenseTimes[1];
              if (med2freq == 3) {
                //Get the third frequency entry
                this.Medication2_info[7] = data.medications[0].dispenseTimes[2];
              }
            }
          }
          console.log(
            "Gathered all associated medication information, loading into the UI"
          );
        });

      //Load the UI with the data in the this.Medication1_info array
      //Load frequency of dosage
      if (this.Medication2_info[1] == 1) {
        this.selected_dosefreq = { frequency: "Once a Day" };
      } else if (this.Medication2_info[1] == 2) {
        this.selected_dosefreq = { frequency: "Twice a Day" };
      } else if (this.Medication2_info[1] == 3) {
        this.selected_dosefreq = { frequency: "Three times a Day" };
      }

      //Load the number of pills per dose
      if (this.Medication2_info[2] == 1) {
        this.selected_medperdose = { amount: "Single Pill" };
      } else if (this.Medication2_info[2] == 2) {
        this.selected_medperdose = { amount: "Two Pills" };
      }

      //Load the cabinet id
      //this.cabinetid = this.Medication2_info[3]

      //Load the amount of pills left
      this.pillsadded = this.Medication2_info[4];

      //Load the text fields with the dispense times
      let med2freq = this.Medication2_info[1];
      if (med2freq >= 1) {
        //Load the first frequency entry
        this.dispense1 = this.Medication2_info[5];
        if (med2freq >= 2) {
          //Load the second frequency entry
          this.dispense2 = this.Medication2_info[6];
          if (med2freq == 3) {
            //Load the third frequency entry
            this.dispense3 = this.Medication2_info[7];
          }
        }
      }
    } else if (this.selectedmedication.name == this.Medication3_info[0]) {
      //Load the UI with the data in the medication2 array (same approach as above)
      this.http
        .post("https://www.rxmind.tech/crud", {
          type: "read",
          payload: {
            name: this.Medication3_info[0],
          },
        })
        .subscribe((data: any) => {
          console.log(data);
          //Get the frequency of the dosage
          let med3freq = data.medication[0].timesDaily;
          this.Medication3_info[1] = data.medications[0].timesDaily;
          //Get the amount of medication per dose
          this.Medication3_info[2] = data.medications[0].pillsPerDose;
          //Save the cabinetid of the medication
          //this.Medication3_info[3] = data.medications[0]._______;
          //Save the amount of pills per medication - amount of pills left
          this.Medication3_info[4] = data.medications[0].pillsAdded;

          //Save the number of times the medication is taken - Dispense times
          if (med3freq >= 1) {
            //Get the first frequency entry
            this.Medication3_info[5] = data.medications[0].dispenseTimes[0];
            if (med3freq >= 2) {
              //Get the second frequency entry
              this.Medication3_info[6] = data.medications[0].dispenseTimes[1];
              if (med3freq == 3) {
                //Get the third frequency entry
                this.Medication3_info[7] = data.medications[0].dispenseTimes[2];
              }
            }
          }
          console.log(
            "Gathered all associated medication information, loading into the UI"
          );
        });

      //Load the UI with the data in the this.Medication1_info array
      //Load frequency of dosage
      if (this.Medication3_info[1] == 1) {
        this.selected_dosefreq = { frequency: "Once a Day" };
      } else if (this.Medication3_info[1] == 2) {
        this.selected_dosefreq = { frequency: "Twice a Day" };
      } else if (this.Medication3_info[1] == 3) {
        this.selected_dosefreq = { frequency: "Three times a Day" };
      }

      //Load the number of pills per dose
      if (this.Medication3_info[2] == 1) {
        this.selected_medperdose = { amount: "Single Pill" };
      } else if (this.Medication3_info[2] == 2) {
        this.selected_medperdose = { amount: "Two Pills" };
      }

      //Load the cabinet id
      //this.cabinetid = this.Medication3_info[3]

      //Load the amount of pills left
      this.pillsadded = this.Medication3_info[4];

      //Load the text fields with the dispense times
      let med3freq = this.Medication3_info[1];
      if (med3freq >= 1) {
        //Load the first frequency entry
        this.dispense1 = this.Medication3_info[5];
        if (med3freq >= 2) {
          //Load the second frequency entry
          this.dispense2 = this.Medication3_info[6];
          if (med3freq == 3) {
            //Load the third frequency entry
            this.dispense3 = this.Medication3_info[7];
          }
        }
      }
    }
  }

  saveMedication() {
    //Check if there is an add or a save operation from the user
    if (this.addmedicine == null) {
      //Gather all of the UI data, and send it to the server
      //Get the medication name
      this.AddMedication[0] = this.selectedmedication;

      //Get the frequency of dosage
      if (this.selected_dosefreq == { frequency: "Once a Day" }) {
        this.AddMedication[1] = 1;
      }
      if (this.selected_dosefreq == { frequency: "Twice a Day" }) {
        this.AddMedication[1] = 2;
      }
      if (this.selected_dosefreq == { frequency: "Three times a Day" }) {
        this.AddMedication[1] = 3;
      }

      //Get the selected amount of medication per dose
      if (this.selected_medperdose == { amount: "Single Pill" }) {
        this.AddMedication[2] = 1;
      } else if (this.selected_medperdose == { amount: "Two Pills" }) {
        this.AddMedication[2] = 2;
      }

      //Get the cabinet id
      this.AddMedication[3] = this.cabinetid;

      //Get the Number of pills added
      this.AddMedication[4] = this.pillsadded;

      //Get the dispensing frequency -based off the dose freq variable
      if (this.AddMedication[1] == 1) {
        this.AddMedication[5] = this.dispense1;
      } else if (this.AddMedication[1] == 2) {
        this.AddMedication[5] = this.dispense1;
        this.AddMedication[6] = this.dispense2;
      } else if (this.AddMedication[1] == 3) {
        this.AddMedication[5] = this.dispense1;
        this.AddMedication[6] = this.dispense2;
        this.AddMedication[7] = this.dispense3;
      }

      //Send the new data to the server with the 'add' tag
      this.http
        .post("https://www.rxmind.tech/crud", {
          type: "add",
          payload: {
            name: this.AddMedication[0],
            timesDaily: this.AddMedication[1],
            dispenseTimes: [
              this.AddMedication[5],
              this.AddMedication[6],
              this.AddMedication[7],
            ],
            pillsadded: this.AddMedication[4],
            pillsPerDose: this.AddMedication[2],
            cabinetNo: this.AddMedication[3],
          },
        })
        .subscribe((data: any) => {
          console.log(data);
          if (data == "201 Created" || data == "Success") {
            //Look for an empty Medicationx_info array and save the this.AddMedication[] information into it
          }
        });
    } else if (this.addmedicine != null) {
      //If this is a save request
      //Figure out which medication is the one selected
      if (this.selectedmedication == this.Medication1_info[0]) {
        //Update the array with the new info
        if (this.selected_dosefreq == { frequency: "Once a Day" }) {
          this.Medication1_info[1] = 1;
        }
        if (this.selected_dosefreq == { frequency: "Twice a Day" }) {
          this.Medication1_info[1] = 2;
        }
        if (this.selected_dosefreq == { frequency: "Three times a Day" }) {
          this.Medication1_info[1] = 3;
        }

        if (this.selected_medperdose == { amount: "Single Pill" }) {
          this.Medication1_info[2] = 1;
        } else if (this.selected_medperdose == { amount: "Two Pills" }) {
          this.Medication1_info[2] = 2;
        }

        this.Medication1_info[3] = this.cabinetid;

        this.Medication1_info[4] = this.pillsadded;

        //Get dispensing times, based off the pill frequency
        if (this.Medication1_info[1] == 1) {
          this.Medication1_info[5] = this.dispense1;
        } else if (this.Medication1_info[1] == 2) {
          this.Medication1_info[5] = this.dispense1;
          this.Medication1_info[6] = this.dispense2;
        } else if (this.Medication1_info[1] == 3) {
          this.Medication1_info[5] = this.dispense1;
          this.Medication1_info[6] = this.dispense2;
          this.Medication1_info[7] = this.dispense3;
        }

        //Send the updated object to the web server
        this.http
          .post("https://www.rxmind.tech/crud", {
            type: "update",
            payload: {
              name: this.Medication1_info[0],
              timesDaily: this.Medication1_info[1],
              dispenseTimes: [
                this.Medication1_info[5],
                this.Medication1_info[6],
                this.Medication1_info[7],
              ],
              pillsadded: this.Medication1_info[4],
              pillsPerDose: this.Medication1_info[2],
              cabinetNo: this.Medication1_info[3],
            },
          })
          .subscribe((data: any) => {
            console.log(data);
            if (data == "201 Created" || data == "Success") {
              //Look for an empty Medicationx_info array and save the this.AddMedication[] information into it
            }
          });
      } else if (this.selectedmedication == this.Medication2_info[0]) {
        //Update the array with the new info
        if (this.selected_dosefreq == { frequency: "Once a Day" }) {
          this.Medication2_info[1] = 1;
        }
        if (this.selected_dosefreq == { frequency: "Twice a Day" }) {
          this.Medication2_info[1] = 2;
        }
        if (this.selected_dosefreq == { frequency: "Three times a Day" }) {
          this.Medication2_info[1] = 3;
        }

        if (this.selected_medperdose == { amount: "Single Pill" }) {
          this.Medication2_info[2] = 1;
        } else if (this.selected_medperdose == { amount: "Two Pills" }) {
          this.Medication2_info[2] = 2;
        }

        this.Medication2_info[3] = this.cabinetid;

        this.Medication2_info[4] = this.pillsadded;

        //Get dispensing times, based off the pill frequency
        if (this.Medication2_info[1] == 1) {
          this.Medication2_info[5] = this.dispense1;
        } else if (this.Medication2_info[1] == 2) {
          this.Medication2_info[5] = this.dispense1;
          this.Medication2_info[6] = this.dispense2;
        } else if (this.Medication2_info[1] == 3) {
          this.Medication2_info[5] = this.dispense1;
          this.Medication2_info[6] = this.dispense2;
          this.Medication2_info[7] = this.dispense3;
        }

        //Send the updated object to the web server
        this.http
          .post("https://www.rxmind.tech/crud", {
            type: "update",
            payload: {
              name: this.Medication2_info[0],
              timesDaily: this.Medication2_info[1],
              dispenseTimes: [
                this.Medication2_info[5],
                this.Medication2_info[6],
                this.Medication2_info[7],
              ],
              pillsadded: this.Medication2_info[4],
              pillsPerDose: this.Medication2_info[2],
              cabinetNo: this.Medication2_info[3],
            },
          })
          .subscribe((data: any) => {
            console.log(data);
            if (data == "201 Created" || data == "Success") {
              //Look for an empty Medicationx_info array and save the this.AddMedication[] information into it
            }
          });
      } else if (this.selectedmedication == this.Medication3_info[0]) {
        if (this.selected_dosefreq == { frequency: "Once a Day" }) {
          this.Medication3_info[1] = 1;
        }
        if (this.selected_dosefreq == { frequency: "Twice a Day" }) {
          this.Medication3_info[1] = 2;
        }
        if (this.selected_dosefreq == { frequency: "Three times a Day" }) {
          this.Medication3_info[1] = 3;
        }

        if (this.selected_medperdose == { amount: "Single Pill" }) {
          this.Medication3_info[2] = 1;
        } else if (this.selected_medperdose == { amount: "Two Pills" }) {
          this.Medication3_info[2] = 2;
        }

        this.Medication3_info[3] = this.cabinetid;

        this.Medication3_info[4] = this.pillsadded;

        //Get dispensing times, based off the pill frequency
        if (this.Medication3_info[1] == 1) {
          this.Medication3_info[5] = this.dispense1;
        } else if (this.Medication3_info[1] == 2) {
          this.Medication3_info[5] = this.dispense1;
          this.Medication3_info[6] = this.dispense2;
        } else if (this.Medication3_info[1] == 3) {
          this.Medication3_info[5] = this.dispense1;
          this.Medication3_info[6] = this.dispense2;
          this.Medication3_info[7] = this.dispense3;
        }

        //Send the updated object to the web server
        this.http
          .post("https://www.rxmind.tech/crud", {
            type: "update",
            payload: {
              name: this.Medication3_info[0],
              timesDaily: this.Medication3_info[1],
              dispenseTimes: [
                this.Medication3_info[5],
                this.Medication3_info[6],
                this.Medication3_info[7],
              ],
              pillsadded: this.Medication3_info[4],
              pillsPerDose: this.Medication3_info[2],
              cabinetNo: this.Medication3_info[3],
            },
          })
          .subscribe((data: any) => {
            console.log(data);
            if (data == "201 Created" || data == "Success") {
              //Look for an empty Medicationx_info array and save the this.AddMedication[] information into it
            }
          });
      }
    }
    //wait for a success response from the web server & display success to user
    console.log("End of the saveMedication btn function");
  }

  removeMedication() {
    //Send the name of the selected medication to delete
    //On the return on the delete call to the web-server, remove any local data
    this.http
      .post("https://www.rxmind.tech/crud", {
        type: "delete",
        payload: {
          name: this.selectedmedication,
        },
      })
      .subscribe((data) => {
        console.log(data);
        console.log("Deleted the medication {0}", this.selectedmedication);

        //Empty the associate medication array
        if (this.selectedmedication == this.Medication1_info[0]) {
          //Remove all elements of the array
          for (let i = 0; i < this.Medication1_info.length; i++) {
            this.Medication1_info[i] = null;
          }
        } else if (this.selectedmedication == this.Medication2_info[0]) {
          for (let i = 0; i < this.Medication2_info.length; i++) {
            this.Medication2_info[i] = null;
          }
        } else if (this.selectedmedication == this.Medication3_info[0]) {
          for (let i = 0; i < this.Medication3_info.length; i++) {
            this.Medication3_info[i] = null;
          }
        }
      });
  }
}
