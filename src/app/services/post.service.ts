import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { PostModel } from '../models/post.model';
import { BehaviorSubject, delay,distinctUntilChanged } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private service:UserService,private http: HttpClient) {
    this.service.UserObservable.pipe(distinctUntilChanged()).subscribe(res=>{
      this.loadPosts();
    })
   }

  
  posts:PostModel[] = new Array();
  pageIndex:number=1;
  pageSize:number=10;
  private _observablePosts: BehaviorSubject<PostModel[]> = new BehaviorSubject(this.posts);
  ObservablePosts= this._observablePosts.asObservable()
  getPosts(body:any){
    return this.http.get('https://ecosnap-api.herokuapp.com/v1/api/activity',{params:body});
  }

  getComments(body:any){
    return this.http.get('https://ecosnap-api.herokuapp.com/v1/api/comment',{params:body})
  }
  
  loadPosts(){
    
    if(this.posts.length==0){
      this.pageIndex =1;
    }

    var body={
      IdForUser: this.service.user?.id || '',
      IdForFriends: '',
      PageIndex: this.pageIndex++,
      PageSize: this.pageSize
    }
    
    this.getPosts(body).subscribe((res:any)=>{
      if(res['data'].length>0){
        this.posts.push(...res['data']);
        this._observablePosts.next(this.posts);
        console.log(this.posts)
      }
    })
  
}

}
