import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserModel} from '../models/user.model'
import { tap } from 'rxjs/internal/operators/tap';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn= this._isLoggedIn.asObservable()
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
        console.log(body)
        this.http.get('https://ecosnap-api.herokuapp.com/v1/api/account/users-by-name',{params:body}).subscribe((res:any) => {
          this.user=res.data[0] as UserModel;
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

  user: UserModel | undefined;
  login(body: any){
    return this.http.post('https://ecosnap-api.herokuapp.com/v1/api/account/login',body).pipe(
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
