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
    this.loadPosts();
  }
  pageIndex:number=1;
  pageSize:number=10;
  posts:PostModel[] = new Array();
  loadPosts(){
    
      var body={
        IdForUser: this.UserService.user?.id || '',
        IdForFriends: '',
        PageIndex: this.pageIndex++,
        PageSize: this.pageSize++
      }

      this.postservice.getPosts(body).subscribe((res:any)=>{
        if(res['data'].length>0){
          this.posts.push(...res['data']);
          console.log(this.posts[0])
        }
      })
    
  }
}
