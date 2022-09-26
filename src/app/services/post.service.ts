import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { PostModel } from '../models/post.model';
import { BehaviorSubject, delay, distinctUntilChanged } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private service: UserService, private http: HttpClient) {
    this.service.UserObservable.pipe(distinctUntilChanged()).subscribe(
      (res) => {
        if(this.posts.length==0){
          this.loadPosts();
        }
        
      }
    );
  }
  url: string = "https://peer-review.hacettepe.edu.tr";

  posts: PostModel[] = new Array();
  pageIndex: number = 1;
  pageSize: number = 50;
  private _observablePosts: BehaviorSubject<PostModel[]> = new BehaviorSubject(
    this.posts
  );
  ObservablePosts = this._observablePosts.asObservable();
  getPosts(body: any) {
    // return this.http.get('https://ecosnap-api.herokuapp.com/v1/api/activity', {
    //   params: body,
    // });
    return this.http.get('https://peer-review.hacettepe.edu.tr/v1/api/activity/by-web-region?NorthEastLatitude=41.1809&NorthEastLongitude=41.8208&SouthWestLatitude=37.2154&SouthWestLongitude=28.3634')
  }
  submitPost(body:any){
    const headers = { "Accept": "application/json" };
    return this.http.post( this.url+'/v1/api/activity/add',body,{headers: headers});
  }

  getComments(body: any) {
    return this.http.get(this.url+'/v1/api/comment', {
      params: body,
    });
  }
  submitComment(body:any){
    const headers = { "Accept": "application/json" };
    return this.http.post(this.url+'/v1/api/comment/add',body,{headers: headers});
  }
  deleteComment(body:any){
    return this.http.delete(this.url+'/v1/api/comment/delete',{body:body});
  }

  getImpressions(body: any){
    return this.http.get(this.url+'/v1/api/activity/reactions', {
      params: body,
    });
  }

  submitKudo(body:any){
    return this.http.post(this.url+'/v1/api/kudo/add',body);
  }
  getKudo(body:any){
    return this.http.get(this.url+'/v1/api/kudo', {
      params: body,
    });
  }
  deleteKudo(body:any){
    return this.http.delete(this.url+'/v1/api/kudo/delete',{body:body});
  }

  loadPosts() {
    if (this.posts.length == 0) {
      this.pageIndex = 1;
    }

    var body = {
      IdForUser: this.service.user?.id || '',
      IdForFriends: '',
      PageIndex: this.pageIndex++,
      PageSize: this.pageSize,
    };

    // this.getPosts(body).subscribe((res: any) => {
    //   if (res['data'].length > 0) {
    //     this.posts.push(...res['data']);
    //     this._observablePosts.next(this.posts);
    //   }
    // });

    this.getPosts(body).subscribe((res: any) => {
        this.posts=[];
        var posts = res as PostModel[];
        this.posts.push(...posts);
        this._observablePosts.next(this.posts);
      
    });

    
  }
  deletePost(id:string){
    return this.http.delete(this.url+'/v1/api/activity/delete',{body:{id:id}});
  }


}
