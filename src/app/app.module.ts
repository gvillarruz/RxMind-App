import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { SettingsComponent } from "./home/settings/settings.component";
import { HomeComponent } from "./home/home.component";
import { EditComponent } from "./home/edit/edit.component";
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { SliderModule } from "primeng/slider";
import { ListboxModule } from "primeng/listbox";
import { CalendarModule } from "primeng/calendar";
import { ProgressBarModule } from "primeng/progressbar";
import { MenubarModule } from "primeng/menubar";
import { ImageModule } from "primeng/image";
import { HttpClientModule } from "@angular/common/http";
import { DropdownModule } from "primeng/dropdown";
import { OverviewComponent } from "./home/overview/overview.component";
import { MultiSelectModule } from "primeng/multiselect";
import { CheckboxModule } from "primeng/checkbox";
import { MessagesModule } from "primeng/messages";
import { MessageModule } from "primeng/message";
import { ToastModule } from "primeng/toast";
import { InputNumberModule } from "primeng/inputnumber";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SettingsComponent,
    HomeComponent,
    EditComponent,
    OverviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputTextModule,
    PasswordModule,
    CommonModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    SliderModule,
    ListboxModule,
    CalendarModule,
    ProgressBarModule,
    MenubarModule,
    BrowserAnimationsModule,
    ImageModule,
    DropdownModule,
    HttpClientModule,
    MultiSelectModule,
    CheckboxModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    InputNumberModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
