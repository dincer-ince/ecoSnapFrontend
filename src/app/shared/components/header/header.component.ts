import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public service:UserService) { }

  @Output() sideBarChange:EventEmitter<any> = new EventEmitter();
  ngOnInit(): void {
  }

  toggleSideBar(){
    this.sideBarChange.emit();
  }

}
