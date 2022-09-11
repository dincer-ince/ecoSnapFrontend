import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';

import { FlexLayoutModule } from '@angular/flex-layout';

import {MatDividerModule} from '@angular/material/divider'

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { PostComponent } from './post/post.component';
import {MatCardModule} from '@angular/material/card';
import { SwiperModule } from 'swiper/angular';
import {MatBadgeModule} from '@angular/material/badge';
import { PostDialogComponent } from './post-dialog/post-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    PostComponent,
    PostDialogComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    FlexLayoutModule,
    RouterModule,
    MatCardModule,
    SwiperModule,
    MatBadgeModule,
    MatDialogModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    PostComponent
  ]
})
export class SharedModule { }
