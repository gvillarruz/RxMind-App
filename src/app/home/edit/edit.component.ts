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
  SaveSuccess = false;
  AddSuccess = false;
  RemoveSuccess = false;

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
    /*this.http
        .post("https://www.rxmind.tech/crud", {
          type: "add",
          payload: {
            name: "Ibuprofen",
            timesDaily: 1,
            dispenseTimes: ["7:58PM"],
            pillsAdded: 10,
            pillsPerDose: 1,
            cabinetNo: 3,
          },
        })
        .subscribe((data) => {
          console.log(data);
        });*/
    /*this.http
      .post("https://www.rxmind.tech/crud", {
        type: "delete",
        payload: {
          name: "Levothyroxine",
        },
      })
      .subscribe((data) => {
        console.log(data);
      });*/
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
          //console.log(data);
          //Get the frequency of the dosage
          let med1freq = data.timesDaily;
          this.Medication1_info[1] = data.timesDaily;
          //Get the amount of medication per dose
          this.Medication1_info[2] = data.pillsPerDose;
          //Save the cabinetid of the medication
          this.Medication1_info[3] = data.cabinetNo;
          //Save the amount of pills per medication - amount of pills left
          this.Medication1_info[4] = data.pillsAdded;

          //Save the number of times the medication is taken - Dispense times
          if (med1freq >= 1) {
            //Get the first frequency entry
            this.Medication1_info[5] = data.dispenseTimes[0];
            if (med1freq >= 2) {
              //Get the second frequency entry
              this.Medication1_info[6] = data.dispenseTimes[1];
              if (med1freq == 3) {
                //Get the third frequency entry
                this.Medication1_info[7] = data.dispenseTimes[2];
              }
            }
          }
          console.log(
            "Gathered all associated medication information, loading into the UI"
          );

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
          this.cabinetid = this.Medication1_info[3];

          //Load the amount of pills left
          this.pillsadded = this.Medication1_info[4];

          //Load the text fields with the dispense times
          med1freq = this.Medication1_info[1];
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
          console.log(
            "Loaded all the data into the UI for medication: ",
            this.Medication1_info[0]
          );
        });
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
          this.Medication2_info[1] = data.timesDaily;
          //Get the amount of medication per dose
          this.Medication2_info[2] = data.pillsPerDose;
          //Save the cabinetid of the medication
          this.Medication2_info[3] = data.cabinetNo;
          //Save the amount of pills per medication - amount of pills left
          this.Medication2_info[4] = data.pillsAdded;

          //Save the number of times the medication is taken - Dispense times
          if (med2freq >= 1) {
            //Get the first frequency entry
            this.Medication2_info[5] = data.dispenseTimes[0];
            if (med2freq >= 2) {
              //Get the second frequency entry
              this.Medication2_info[6] = data.dispenseTimes[1];
              if (med2freq == 3) {
                //Get the third frequency entry
                this.Medication2_info[7] = data.dispenseTimes[2];
              }
            }
          }
          console.log(
            "Gathered all associated medication information, loading into the UI"
          );

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
          this.cabinetid = this.Medication2_info[3];

          //Load the amount of pills left
          this.pillsadded = this.Medication2_info[4];

          //Load the text fields with the dispense times
          med2freq = this.Medication2_info[1];
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
          console.log(
            "Loaded all the data into the UI for medication: ",
            this.Medication2_info[0]
          );
        });
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
          let med3freq = data.timesDaily;
          this.Medication3_info[1] = data.timesDaily;
          //Get the amount of medication per dose
          this.Medication3_info[2] = data.pillsPerDose;
          //Save the cabinetid of the medication
          this.Medication3_info[3] = data.cabinetNo;
          //Save the amount of pills per medication - amount of pills left
          this.Medication3_info[4] = data.pillsAdded;

          //Save the number of times the medication is taken - Dispense times
          if (med3freq >= 1) {
            //Get the first frequency entry
            this.Medication3_info[5] = data.dispenseTimes[0];
            if (med3freq >= 2) {
              //Get the second frequency entry
              this.Medication3_info[6] = data.dispenseTimes[1];
              if (med3freq == 3) {
                //Get the third frequency entry
                this.Medication3_info[7] = data.dispenseTimes[2];
              }
            }
          }
          console.log(
            "Gathered all associated medication information, loading into the UI"
          );

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
          this.cabinetid = this.Medication3_info[3];

          //Load the amount of pills left
          this.pillsadded = this.Medication3_info[4];

          //Load the text fields with the dispense times
          med3freq = this.Medication3_info[1];
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
          console.log(
            "Loaded all the data into the UI for medication: ",
            this.Medication3_info[0]
          );
        });
    }
  }

  saveMedication() {
    this.SaveSuccess = false;
    this.AddSuccess = false;
    this.RemoveSuccess = false;
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
            pillsAdded: this.AddMedication[4],
            pillsPerDose: this.AddMedication[2],
            cabinetNo: this.AddMedication[3],
          },
        })
        .subscribe((data: any) => {
          console.log(data);
          if (data == true) {
            //Show success message to the user
            this.AddSuccess = true;
            let i = 0;
            //Add the medication to an empty Medicationx_info array
            if (
              this.Medication1_info[0] == null ||
              this.Medication1_info[0] == undefined
            ) {
              //Populate all AddMedication fields into the Medication1_info array
              for (i = 0; i < this.AddMedication.length; i++) {
                this.Medication1_info[i] = this.AddMedication[i];
              }
            } else if (
              this.Medication2_info[0] == null ||
              this.Medication2_info[0] == undefined
            ) {
              //Populate all AddMedication fields into the Medication1_info array
              for (i = 0; i < this.AddMedication.length; i++) {
                this.Medication1_info[i] = this.AddMedication[i];
              }
            } else if (
              this.Medication3_info[0] == null ||
              this.Medication3_info[0] == undefined
            ) {
              //Populate all AddMedication fields into the Medication1_info array
              for (i = 0; i < this.AddMedication.length; i++) {
                this.Medication1_info[i] = this.AddMedication[i];
              }
            }
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
              pillsAdded: this.Medication1_info[4],
              pillsPerDose: this.Medication1_info[2],
              cabinetNo: this.Medication1_info[3],
            },
          })
          .subscribe((data: any) => {
            console.log(data);
            if (data == true) {
              this.SaveSuccess = true;
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
              pillsAdded: this.Medication2_info[4],
              pillsPerDose: this.Medication2_info[2],
              cabinetNo: this.Medication2_info[3],
            },
          })
          .subscribe((data: any) => {
            console.log(data);
            if (data == true) {
              this.SaveSuccess = true;
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
              pillsAdded: this.Medication3_info[4],
              pillsPerDose: this.Medication3_info[2],
              cabinetNo: this.Medication3_info[3],
            },
          })
          .subscribe((data: any) => {
            console.log(data);
            if (data == true) {
              this.SaveSuccess = true;
            }
          });
      }
    }
    //wait for a success response from the web server & display success to user
    console.log("End of the saveMedication btn function");
  }

  removeMedication() {
    this.SaveSuccess = false;
    this.AddSuccess = false;
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
        if (data == true) {
          this.RemoveSuccess = true;
        }
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
