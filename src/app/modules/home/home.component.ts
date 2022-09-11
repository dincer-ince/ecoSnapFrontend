import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import Overlay from 'ol/Overlay';
import { activityTypeModel,PostModel } from 'src/app/models/post.model';
import { GeoService } from 'src/app/services/geo.service';
import { PostService } from 'src/app/services/post.service';
import { MatDialog } from '@angular/material/dialog';
import { PostDialogComponent } from 'src/app/shared/post-dialog/post-dialog.component';
import { Observable } from 'ol';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit,OnDestroy {
  listener: any;

  constructor(private geoService: GeoService,private postservice:PostService,private dialog: MatDialog) {
   }
   
  ngAfterViewInit(): void {
    
  
    //this.postservice.loadPosts();
    
    //this.geoService.updateView(5, [32.785501,39.964339])
    this.geoService.setTileSource();
    this.geoService.updateSize(); 
    console.log('called')

    const container = document.getElementById('popup');
    const content = document.getElementById('popup-content');
    const closer = document.getElementById('popup-closer');

    const overlay = new Overlay({
      element: container!,
      autoPan: true,
    });


    this.listener=this.geoService.map.on('singleclick', (evt: any) => {

      const coordinate = evt.coordinate;

      if(this.geoService.map.hasFeatureAtPixel(evt.pixel)){

        var clickedFeatureClust= this.geoService.map.getFeaturesAtPixel(evt.pixel).pop();
        if(clickedFeatureClust==null){

          return;
        }
        var clickedFeature =clickedFeatureClust.get("features");
     
        if(clickedFeature.length==1){
        var clickedActivity:PostModel= clickedFeature[0].get("element"); 
        this.openDialog(clickedActivity);

        }
        else if(clickedFeature.length>1){
          console.log("multiple features")
        }
 
        
        
      }

      
      


    });
    

    closer!.onclick = function () {
      overlay.setPosition(undefined);
      closer!.blur();
      return false;
    };
  
  
  
  }
  test(){
    console.log(this.geoService.map.getAllLayers())
  }

  openDialog(post:PostModel){
    if(this.dialog.openDialogs.length!=0){
      return;
    }

    const dialogRef = this.dialog.open(PostDialogComponent,{
      height: '100vh',
      width: 'auto',
      maxHeight: '100vh',
      maxWidth: '100vw',
    });
    dialogRef.componentInstance.post = post
  }

  ngOnDestroy(): void {
    this.geoService.map.un('singleclick', this.listener)
  }

}
