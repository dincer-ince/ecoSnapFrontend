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
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NewPostDialogComponent } from './new-post-dialog/new-post-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    PostComponent,
    PostDialogComponent,
    NewPostDialogComponent
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
    MatDialogModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    PostComponent
  ]
})
export class SharedModule { }
