import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserModel} from '../models/user.model'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  user: UserModel | undefined;
  login(body: any){
    return this.http.post('https://ecosnap-api.herokuapp.com/v1/api/account/login',body);
  }
}
