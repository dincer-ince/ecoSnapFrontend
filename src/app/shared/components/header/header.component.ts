import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { LayerChangeDialogComponent } from '../layer-change-dialog/layer-change-dialog.component';
import { AboutDialogComponent } from '../about-dialog/about-dialog.component';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public service:UserService, private dialog:MatDialog,private postservice:PostService) { }

  @Output() sideBarChange:EventEmitter<any> = new EventEmitter();
  ngOnInit(): void {
  }

  signOut(){
    this.postservice.posts=[];
    this.service.signOut();
  }

  toggleSideBar(){
    this.sideBarChange.emit();
  }
  openLayerChange(){
    this.dialog.open(LayerChangeDialogComponent);
  }
  about(){
    this.dialog.open(AboutDialogComponent);
  }
}
