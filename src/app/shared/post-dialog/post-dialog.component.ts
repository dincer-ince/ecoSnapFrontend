import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { UserService } from 'src/app/services/user.service';
import {
  PostModel,
  commentModel,
  impressionsModel,
  kudoModel,
} from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';
import SwiperCore, { Pagination, Navigation, Scrollbar } from 'swiper';
import { FormControl,Validators} from '@angular/forms';

SwiperCore.use([Navigation, Pagination, Scrollbar]);
@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.scss'],
})
export class PostDialogComponent implements OnInit {
  @Input() post!: PostModel;
  public comments: BehaviorSubject<commentModel[]> = new BehaviorSubject(
    new Array()
  );
  constructor(public service: PostService, public userService: UserService) {}

  liked = false;
  disliked = false;
  likes = 0;
  dislikes = 0;
  commentCount = 0;
  photos: string[] = [];

  loadImpressions() {
    this.service
      .getImpressions({ ActivityId: this.post.id })
      .subscribe((res: any) => {
        var impressions = res as impressionsModel;
        this.likes = impressions.supporters.length;
        this.dislikes = impressions.criticisers.length;
        this.commentCount = impressions.commentCount;
        this.liked = false;
        this.disliked = false;
        impressions.supporters.forEach((x) => {
          if (x === this.userService.user?.id) {
            this.liked = true;
          }
        });
        impressions.criticisers.forEach((x) => {
          if (x === this.userService.user?.id) {
            this.disliked = true;
          }
        });
      });
  }

  kudoSubmit(help: boolean) {
    var body = {
      userId: this.userService.user?.id,
      activityId: this.post.id,
      isHelpful: help,
    };
    this.service.submitKudo(body).subscribe((res: any) => {
      this.loadImpressions();
    });
  }
  kudoDelete(help: boolean) {
    var self = this;
    var body = {
      ActivityId: this.post.id,
      isHelpful: help,
    };
    this.service.getKudo(body).subscribe((res) => {
      var kudos = res as kudoModel[];
      var exists = '';
      kudos.forEach((x) => {
        if (x.user.id === this.userService.user?.id) {
          exists = x.id;
        }
      });
      if (exists != '') {
        var payload = { id: exists };
        this.service.deleteKudo(payload).subscribe((res: any) => {
          this.loadImpressions();
        });
      }
    });
  }

  loadingComments: boolean = true;
  ngOnInit(): void {
    this.loadImpressions();
    this.photos.push(this.post.snapshot.uri);
    this.post.photos.forEach((photo) => this.photos.push(photo.uri));
    this.loadComments();
  }
  loadComments(): void {
    var body = {
      ActivityId: this.post.id,
    };

    this.service.getComments(body).subscribe((res) => {
      this.loadingComments = false;
      var list = res as commentModel[];
      this.comments.next(list);
    });
  }
  comment= new FormControl();
  submitComment(){
    if(this.comment.value!=''){

      const comment = new FormData();
      comment.append('Message', this.comment.value),
      comment.append('UserId', this.userService.user!.id);
      comment.append('ActivityId', this.post.id);
      this.service.submitComment(comment).subscribe((res: any) => {
        this.loadComments();
        this.comment.patchValue('');
      })

    }
  }

  deleteComment(id:string){

    this.service.deleteComment({id:id}).subscribe((res:any) => {

      this.loadComments();
    })
  }
  
}
