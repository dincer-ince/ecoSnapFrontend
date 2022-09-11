import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private service:UserService,private http: HttpClient) { }

  getPosts(body:any){
    return this.http.get('https://ecosnap-api.herokuapp.com/v1/api/activity',{params:body});
  }
  

}
