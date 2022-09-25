import { Component, OnInit } from '@angular/core';
import{UserService} from '../../../services/user.service';
import { MatDialog} from '@angular/material/dialog';
import { LegalDialogComponent } from '../legal-dialog/legal-dialog.component';
import { AboutDialogComponent } from '../about-dialog/about-dialog.component';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(public service:UserService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  test(){
    this.dialog.open(LegalDialogComponent);
  }
  about(){
    this.dialog.open(AboutDialogComponent);
  }

}
