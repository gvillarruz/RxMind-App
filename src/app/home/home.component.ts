import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  menuitems: MenuItem[];

  constructor(private http: HttpClient) {
    this.menuitems = [
      { label: "Home", routerLink: "overview" },
      { label: "Add or Edit Medications", routerLink: "edit" },
      { label: "Settings", routerLink: "settings" },
    ];
  }

  ngOnInit(): void {
    this.http
      .post("https://www.rxmind.tech/login", {
        username: "admin",
        password: "admin",
      })
      .subscribe((data) => {
        console.log(data);
      });
  }
}
