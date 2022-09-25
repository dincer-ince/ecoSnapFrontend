import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GeoService } from 'src/app/services/geo.service';

@Component({
  selector: 'app-layer-change-dialog',
  templateUrl: './layer-change-dialog.component.html',
  styleUrls: ['./layer-change-dialog.component.scss']
})
export class LayerChangeDialogComponent implements OnInit {

  constructor(public service: GeoService) { }

  ngOnInit(): void {
  }

  value:FormControl = new FormControl(0);
  onSubmit(){
    this.service.selectedTileSource=this.service.tileSources[this.value.value];
    this.service.setTileSource();
  }

}
