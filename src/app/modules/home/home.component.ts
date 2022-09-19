import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import Overlay from 'ol/Overlay';
import { activityTypeModel, PostModel } from 'src/app/models/post.model';
import { GeoService } from 'src/app/services/geo.service';
import { PostService } from 'src/app/services/post.service';
import { MatDialog } from '@angular/material/dialog';
import { PostDialogComponent } from 'src/app/shared/post-dialog/post-dialog.component';
import { Observable } from 'ol';
import { NewPostDialogComponent } from 'src/app/shared/new-post-dialog/new-post-dialog.component';
import {fromLonLat, toLonLat} from 'ol/proj';
import {toStringHDMS} from 'ol/coordinate';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  listener: any;

  constructor(
    public geoService: GeoService,
    private postservice: PostService,
    private dialog: MatDialog
  ) {}

  newPostMode: boolean = false;

  ngAfterViewInit(): void {
    //this.postservice.loadPosts();

    //this.geoService.updateView(5, [32.785501,39.964339])
    this.geoService.setTileSource();
    this.geoService.updateSize();
    console.log('called');

    this.listener = this.geoService.map.on('singleclick', (evt: any) => {
      const coordinate = evt.coordinate;
      if (!this.newPostMode) {
        if (this.geoService.map.hasFeatureAtPixel(evt.pixel)) {
          var clickedFeatureClust = this.geoService.map
            .getFeaturesAtPixel(evt.pixel)
            .pop();
          if (clickedFeatureClust == null) {
            return;
          }
          var clickedFeature = clickedFeatureClust.get('features');

          if (clickedFeature.length == 1) {
            var clickedActivity: PostModel = clickedFeature[0].get('element');
            this.openDialog(clickedActivity);
          } else if (clickedFeature.length > 1) {
            console.log('multiple features');
          }
        }
      }
      else
      {

        this.newPost(toLonLat(coordinate));

      }
    });
  }
  test() {
    console.log(this.geoService.map.getAllLayers());
  }

  openDialog(post: PostModel) {
    if (this.dialog.openDialogs.length != 0) {
      return;
    }

    const dialogRef = this.dialog.open(PostDialogComponent, {
      height: '100vh',
      width: 'auto',
      maxHeight: '100vh',
      maxWidth: '100vw',
    });
    dialogRef.componentInstance.post = post;
  }

  newPost(coordinate:any){
    if (this.dialog.openDialogs.length != 0) {
      return;
    }

    const dialogRef = this.dialog.open(NewPostDialogComponent, {
      height: 'auto',
      width: '50vw',
      maxHeight: '100vh',
      maxWidth: '100vw',
    });
    dialogRef.componentInstance.coordinate = coordinate ;
  }
  

  ngOnDestroy(): void {
    this.geoService.map.un('singleclick', this.listener);
  }
}
