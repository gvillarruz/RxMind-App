import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SettingsComponent } from './settings/settings.component';
import { HomeComponent } from './home/home.component';
import { EditComponent } from './edit/edit.component';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import { CommonModule } from '@angular/common';
import { FormsModule }    from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import {SliderModule} from 'primeng/slider';
import {ListboxModule} from 'primeng/listbox';
import {CalendarModule} from 'primeng/calendar';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SettingsComponent,
    HomeComponent,
    EditComponent
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
    CalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
