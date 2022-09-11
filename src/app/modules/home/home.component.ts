import { Component, OnInit } from '@angular/core';
import { GeoService } from 'src/app/services/geo.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private geoService: GeoService) {
   }

  ngOnInit(): void {
    
    this.geoService.updateSize(); 
    //this.geoService.updateView(5, [32.785501,39.964339])
    this.geoService.setTileSource();
    console.log('called')
  
  }
  test(){
    console.log('bos')
    console.log(this.geoService.map.getView())
  }

}
