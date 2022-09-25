import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import {PostModel} from '../../models/post.model'

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  constructor(public postservice:PostService,private UserService:UserService) { }

  ngOnInit(): void {
    //this.postservice.loadPosts();
  }
  test(){
  }

  
  
}
