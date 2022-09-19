import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { HomeComponent } from 'src/app/modules/home/home.component';
import { RouterModule } from '@angular/router';
import { RecordComponent } from 'src/app/modules/record/record.component';
import { SharedModule } from 'src/app/shared/shared.module';
import{MatSidenavModule} from '@angular/material/sidenav';
import { MatDividerModule} from '@angular/material/divider';
import { RankingComponent } from 'src/app/modules/ranking/ranking.component';
import { PostsComponent } from 'src/app/modules/posts/posts.component';
import{FlexLayoutModule} from '@angular/flex-layout'
import {MatDialogModule} from '@angular/material/dialog';
import{MatIconModule} from '@angular/material/icon';
import{MatButtonModule}from '@angular/material/button';


@NgModule({
  declarations: [
    DefaultComponent,
    HomeComponent,
    RecordComponent,
    RankingComponent,
    PostsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    FlexLayoutModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class DefaultModule { }
