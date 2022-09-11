import { Component, Input, OnInit } from '@angular/core';
import { PostModel } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';
import SwiperCore,{Pagination,Navigation,Scrollbar} from 'swiper';
//import 'swiper/scss';

SwiperCore.use([Navigation, Pagination, Scrollbar]);
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post!:PostModel
  constructor(public service:PostService) { }


  photos:string[] = [];
  ngOnInit(): void {
    this.post.photos.forEach(photo=>
      this.photos.push(photo.uri));
    console.log(this.photos)
  }

}
