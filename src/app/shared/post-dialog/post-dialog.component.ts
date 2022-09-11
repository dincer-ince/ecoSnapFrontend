import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { PostModel,commentModel } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';
import SwiperCore,{Pagination,Navigation,Scrollbar} from 'swiper';

SwiperCore.use([Navigation, Pagination, Scrollbar]);
@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.scss']
})
export class PostDialogComponent implements OnInit {
  @Input() post!:PostModel
  public comments:BehaviorSubject<commentModel[]> = new BehaviorSubject(new Array());
  constructor(public postservice:PostService) { }
  photos:string[] = [];
  ngOnInit(): void {
    this.photos.push(this.post.snapshot.uri)
    this.post.photos.forEach(photo=>
      this.photos.push(photo.uri));
    
    var body={
      ActivityId: this.post.id
    }
    this.postservice.getComments(body).subscribe(res=>
      { 
        var list = res as commentModel[];
        this.comments.next(list);
      })
  }

}
