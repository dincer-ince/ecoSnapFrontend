import { Component, Input, OnInit } from '@angular/core';
import {
  PostModel,
  impressionsModel,
  kudoModel,
} from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';
import SwiperCore, { Pagination, Navigation, Scrollbar } from 'swiper';
import { MatDialog } from '@angular/material/dialog';
import { PostDialogComponent } from 'src/app/shared/post-dialog/post-dialog.component';
import { map } from 'rxjs/internal/operators/map';
import { UserService } from 'src/app/services/user.service';
import { toStringHDMS } from 'ol/coordinate';
//import 'swiper/scss';

SwiperCore.use([Navigation, Pagination, Scrollbar]);
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() post!: PostModel;
  constructor(
    public service: PostService,
    private dialog: MatDialog,
    private userService: UserService
  ) {}

  liked = false;
  disliked = false;
  likes = 0;
  dislikes = 0;
  comments = 0;
  photos: string[] = [];

  loadImpressions() {
    this.service
      .getImpressions({ ActivityId: this.post.id })
      .subscribe((res: any) => {
        var impressions = res as impressionsModel;
        this.likes = impressions.supporters.length;
        this.dislikes = impressions.criticisers.length;
        this.comments = impressions.commentCount;
        console.log(impressions);
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
      console.log(res);
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
      console.log(kudos);
      var exists = '';
      kudos.forEach((x) => {
        if (x.user.id === this.userService.user?.id) {
          exists = x.id;
        }
      });
      console.log(exists);
      if (exists != '') {
        var payload = { id: exists };
        console.log(payload);
        this.service.deleteKudo(payload).subscribe((res: any) => {
          this.loadImpressions();
        });
      }
    });
  }

  ngOnInit(): void {
    this.post.photos.forEach((photo) => this.photos.push(photo.uri));
    this.loadImpressions();
  }

  openDialog() {
    const dialogRef = this.dialog.open(PostDialogComponent, {
      height: '100vh',
      width: 'auto',
      maxHeight: '100vh',
      maxWidth: '100vw',
    });
    dialogRef.componentInstance.post = this.post;
  }
}
