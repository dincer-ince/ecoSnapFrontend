import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormControl,FormGroup} from '@angular/forms';
import { textHeights } from 'ol/render/canvas';
import { PostService } from 'src/app/services/post.service';
import { MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-new-post-dialog',
  templateUrl: './new-post-dialog.component.html',
  styleUrls: ['./new-post-dialog.component.scss']
})
export class NewPostDialogComponent implements OnInit {
  @Input() coordinate!: number[];
  constructor(public userService: UserService, private postService: PostService, private dialog: MatDialog) { }
  photos: string[]= [];
  ngOnInit(): void {
  }

  form = new FormData();
  title = new FormControl();
  description = new FormControl();
  aktivitetipi= new FormControl();

  onSubmit= new  EventEmitter();

  selectFile(event:any){
    if(event.target.files){
      
      for (var i=0; i<event.target.files.length; i++) {
        this.files.push(event.target.files[i]);
        var reader = new FileReader(); 
        reader.readAsDataURL(event.target.files[i]);
        reader.onload= (event:any)=> {
        this.photos.push(event.target.result);
      }
      }
      
    }
  }
  files:File[]=[];

  submit(){
    for(let i=1; i<this.files.length; i++){
      this.form.append('Photos', this.files[i]);
    }
    this.form.append('UserId', this.userService.user!.id);
    this.form.append('Name', this.title.value);
    this.form.append('Description', this.description.value);
    this.form.append('ActivityTypeId' , this.aktivitetipi.value);
    var latitude=this.coordinate[1]
    var longitude=this.coordinate[0]
    this.form.append('Latitude', latitude.toString());
    this.form.append('Longitude', longitude.toString());
    this.form.append('IsPrivate', "false");
    var base64result = this.photos[0].split(',')[1];
    this.form.append('Base64Snapshot', base64result);
    //this.photos.shift();
    

   
    this.postService.submitPost(this.form).subscribe(res=>{
      this.dialog.closeAll();
      this.postService.posts=[];
      this.postService.loadPosts();
      this.onSubmit.emit();
    })
  }

}
