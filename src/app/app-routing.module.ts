import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { OverviewComponent} from "./home/overview/overview.component";
import { HomeComponent } from "./home/home.component";
import { EditComponent } from "./home/edit/edit.component";
import { SettingsComponent } from "./home/settings/settings.component";

const routes: Routes = [
  { path: "login", component: LoginComponent, children: [] },
  { path: "overview", component: OverviewComponent},
  { path: "home", component: HomeComponent },
  { path: "edit", component: EditComponent },
  { path: "settings", component: SettingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
