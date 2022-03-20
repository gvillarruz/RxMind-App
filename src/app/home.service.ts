import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class HomeService {
  homeData: any;
  constructor(private http: HttpClient) {}

}
