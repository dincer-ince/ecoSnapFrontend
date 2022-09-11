import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';
import { LoginModule } from './layouts/login/login.module';
import { Router } from '@angular/router';
import {GeoService}from './services/geo.service'






@NgModule({
  declarations: [
    AppComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
    LoginModule
  ],
  providers: [
    GeoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private router:Router){
    router.navigate(['']);
  }
}
