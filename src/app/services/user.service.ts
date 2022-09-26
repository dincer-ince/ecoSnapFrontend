import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserModel} from '../models/user.model'
import { tap } from 'rxjs/internal/operators/tap';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Router } from '@angular/router';
import { PostService } from './post.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn= this._isLoggedIn.asObservable()

  url: string = "https://peer-review.hacettepe.edu.tr";

  constructor(private http: HttpClient,private router:Router) { 
    const token = localStorage.getItem('token')
    this._isLoggedIn.next(!!token)
    if(this.isLoggedIn){
      if(localStorage.getItem('user')!=null){
        var body={
          NameSurname:localStorage.getItem('user') || '',
          PageIndex:1,
          PageSize:1,
        }
        this.http.get(this.url+'/v1/api/account/users-by-name',{params:body}).subscribe((res:any) => {
          this.user=res.data[0] as UserModel;
          this._UserObservable.next(this.user);

        },err =>{ 
          localStorage.removeItem('token');
          localStorage.removeItem('user')
          router.navigate(['login'])})
      }
      else{
        localStorage.removeItem('token');
        localStorage.removeItem('user')
        router.navigate(['login'])
      }
    }
  }
  
  user: UserModel | undefined=undefined;
  public _UserObservable = new BehaviorSubject<any>(this.user);
  UserObservable=this._UserObservable.asObservable();
  login(body: any){
    return this.http.post(this.url+'/v1/api/account/login',body).pipe(
      tap((res:any) =>{
        localStorage.setItem('token',res.token)
        this._isLoggedIn.next(true);
      })
    );
  }

  signOut(){
    this.user = undefined;
    this._isLoggedIn.next(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user')
    this.router.navigate(['login'])
  }
}
