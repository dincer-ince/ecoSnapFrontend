import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import {LoginModel, UserModel} from '../../models/user.model'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;

  //email= new FormControl('', [Validators.email, Validators.required ])

  signin: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required ]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  getErrorMessage() {
    if (this.signin.controls['email'].hasError('required') ) {
      return 'You must enter a value';
    }

    return this.signin.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }
  getPasswordErrorMessage(){
    if (this.signin.controls['password'].hasError('required') ) {
      return 'You must enter a value';
    }

    return this.signin.controls['password'].hasError('minlength') ? 'Not a valid password' : '';
  }

  constructor(public service:UserService, private router:Router, private postservice: PostService) { }

  ngOnInit(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.service.user=undefined;
    this.postservice.posts=[];
  }
  
  loading:boolean = false;
  loginError:boolean = false;

  onSubmit(){
    this.loading=true;
    var body = {
      email:this.signin.value.email,
      password:this.signin.value.password,
      pushToken: "string"
    }
    this.service.login(body).subscribe(res=>{
      this.loading = false;
      var login= res as LoginModel;
      this.service.user=login.user as UserModel;
      this.service._UserObservable.next(this.service.user);
      localStorage.setItem('user',this.service.user.name+''+this.service.user.surname)
      this.router.navigate(['/'])

    },
    err =>{
      this.loading=false;
      this.loginError = true;
    })
    
  }

  guestsignIn(){
//     misafirhacettepe@gmail.com
// misafir2022
    this.signin.patchValue({
      email: "misafirhacettepe@gmail.com",
      password:"Misafir2022"
    })
    this.onSubmit();

}

}
