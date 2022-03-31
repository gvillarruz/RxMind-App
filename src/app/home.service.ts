import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class HomeService {
  homeData: any;
  constructor(private http: HttpClient) {}

  convertTime12to24(time12h) {
    let [hours, minutes] = time12h.split(":");
    let modifier = minutes.substring(2);
    minutes = minutes.substring(0, 2);

    if (hours === "12") {
      hours = "00";
    }

    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }

    console.log(`${hours}:${minutes}`);

    return { hours: hours, minutes: Number(minutes) };
  }
}
