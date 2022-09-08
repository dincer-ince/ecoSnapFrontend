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




@NgModule({
  declarations: [
    DefaultComponent,
    HomeComponent,
    RecordComponent,
    RankingComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule
  ]
})
export class DefaultModule { }
