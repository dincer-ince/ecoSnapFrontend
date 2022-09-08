import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import{MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card'
import{ FlexLayoutModule} from '@angular/flex-layout'
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import{MatIconModule} from '@angular/material/icon';
import{MatButtonModule}from '@angular/material/button';
import{HttpClientModule} from '@angular/common/http'
import {RouterModule} from '@angular/router';
import{MatProgressSpinnerModule} from '@angular/material/progress-spinner'


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatCardModule,
    FlexLayoutModule,
    MatTabsModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    RouterModule,
    MatProgressSpinnerModule
    
  ]
})
export class LoginModule { }
