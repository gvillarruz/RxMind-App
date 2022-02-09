import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
import { Menubar } from "primeng/menubar";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  menuitems: MenuItem[];

  constructor() {
    this.menuitems = [
      { label: "Home", routerLink: "overview" },
      { label: "Add or Edit Medications", routerLink: "edit" },
      { label: "Settings", routerLink: "settings" },
    ];
  }

  ngOnInit(): void {}
}
