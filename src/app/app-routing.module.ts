import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { EditComponent } from "./home/edit/edit.component";
import { SettingsComponent } from "./home/settings/settings.component";

const routes: Routes = [
  { path: "login", component: LoginComponent, children: [] },
  { path: "home", component: HomeComponent },
  { path: "edit", component: EditComponent },
  { path: "settings", component: SettingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
