import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import ZoomToExtent from 'ol/control/ZoomToExtent';
import FullScreen from 'ol/control/FullScreen';
import Attribution from 'ol/control/Attribution';
import OsmSource from 'ol/source/OSM';
import StamenSource from 'ol/source/Stamen';
import VectorSource from 'ol/source/Vector';
import Cluster from 'ol/source/Cluster';
import { fromLonLat } from 'ol/proj';
import { defaults as defaultControls } from 'ol/control';
import { defaults as defaultInteractions, PinchZoom } from 'ol/interaction';
import { Injectable } from '@angular/core';
import { Collection, Feature } from 'ol';
import { Geometry, Point } from 'ol/geom';
import { PostService } from './post.service';
import {Circle as CircleStyle, Fill, Stroke, Style, Text,Icon} from 'ol/style';

export interface Vector {
  readonly name: string;
  readonly source: VectorSource;
}
@Injectable()
export class GeoService {
  bound:boolean=false;
  tileSources = [
    { name: 'OSM', source: new OsmSource() },
    { name: 'Stamen', source: new StamenSource({ layer: 'terrain' }) }
  ];

  selectedTileSource = this.tileSources[0];
  vectorSource: VectorSource=new VectorSource;

  public features: Feature[]=[]
  public readonly map: Map;
  private readonly tileLayer: TileLayer<OsmSource>;
  private readonly vectorLayer: VectorLayer<any>;
  private clusterSource:Cluster;
  private readonly extent = [3611650.626394008, 4827814.081135093, 3677539.34477583, 4874937.5090729045];

  constructor(public service:PostService) {
    var self = this;
    this.tileLayer = new TileLayer();
    this.clusterSource=new Cluster({
      distance:80,
      source:this.vectorSource
    })
    const styleCache:any = {}
    this.vectorLayer = new VectorLayer<any>({
      source: this.clusterSource,
      style: function(feature) {
        const size = feature.get('features').length;
        let style = styleCache[size];
        // if (!style) {
          if(size==1){
            if(feature.get('features')[0].get('element').activityType.id==1){
              style=new Style({
                image: new Icon(({
                  
                  crossOrigin: 'anonymous',
                  src: 'assets/errornet.png',
                  imgSize: [24, 24]
                }))
              })
            }
            else if(feature.get('features')[0].get('element').activityType.id==2){
              style=new Style({
                image: new Icon(({
                  
                  crossOrigin: 'anonymous',
                  src: 'assets/trash.png',
                  imgSize: [24, 24]
                }))
              })
            }
            else if(feature.get('features')[0].get('element').activityType.id==3){
              style=new Style({
                image: new Icon(({
                  
                  crossOrigin: 'anonymous',
                  src: 'assets/sidewalk.png',
                  imgSize: [24, 24]
                }))
              })
            }
            else if(feature.get('features')[0].get('element').activityType.id==4){
              style=new Style({
                image: new Icon(({
                  
                  crossOrigin: 'anonymous',
                  src: 'assets/electricity.png',
                  imgSize: [24, 24]
                }))
              })
            }
            else if(feature.get('features')[0].get('element').activityType.id==5){
              style=new Style({
                image: new Icon(({
                  
                  crossOrigin: 'anonymous',
                  src: 'assets/parking.png',
                  imgSize: [24, 24]
                }))
              })
            }
            else if(feature.get('features')[0].get('element').activityType.id==6){
              style=new Style({
                image: new Icon(({
                  
                  crossOrigin: 'anonymous',
                  src: 'assets/waste.png',
                  imgSize: [24, 24]
                }))
              })
            }
            else if(feature.get('features')[0].get('element').activityType.id==7){
              style=new Style({
                image: new Icon(({
                  
                  crossOrigin: 'anonymous',
                  src: 'assets/electricity.png',
                  imgSize: [24, 24]
                }))
              })
            }
          }
            else{style = new Style({
              image: new CircleStyle({
                radius: 10,
                stroke: new Stroke({
                  color: '#fff'
                }),
                fill: new Fill({
                  color: 'black'
                })
              }),
              text: new Text(
                {
                text: size.toString(),
                fill: new Fill({
                  color: '#fff'
                })
              })
            });}
          styleCache[size] = style;
        // }
        return style;
      }
    });

    this.map = new Map({
      interactions: defaultInteractions().extend([
        new PinchZoom()
      ]),
      layers: [
        this.tileLayer,

      ],
      view: new View({
        constrainResolution: true
      }),
      controls: defaultControls().extend([
        new Attribution(),
        new ZoomToExtent({ extent: this.extent }),
        new FullScreen()
      ])
    });

    this.map.getView().setZoom(4);
    this.map.getView().setCenter(fromLonLat([32.785501,39.964339]));


    this.service.ObservablePosts.subscribe(post => {this.AddFeatures()})

  }

  /**
   * Updates zoom and center of the view.
   * @param zoom Zoom.
   * @param center Center in long/lat.
   */
  updateView(zoom = 2, center: [number, number] = [0, 0]): void {
    this.map.getView().setZoom(zoom);
    this.map.getView().setCenter(fromLonLat(center));
  }

  /**
   * Updates target and size of the map.
   * @param target HTML container.
   */
  updateSize(target = 'map'): void {
    if(!this.bound){
      this.map.setTarget('');
      this.map.setTarget(target);
      this.map.updateSize();
      //this.bound=true;
    }
    
  }

  /**
   * Sets the source of the tile layer.
   * @param source Source.
   */
  setTileSource(source = this.selectedTileSource): void {
    this.selectedTileSource = source;
    this.tileLayer.setSource(source.source);
  }

  /**
   * Sets the source of the vector layer.
   * @param source Source.
   */
  setVectorSource(source: VectorSource): void {

    this.clusterSource.setSource(source)
    this.vectorLayer.setSource(this.clusterSource);
    this.map.removeLayer(this.vectorLayer)
    this.map.addLayer(this.vectorLayer);
    this.map.getView().fit(this.vectorLayer.getSource().getSource().getExtent(),{duration:400,maxZoom:8,padding: [ 100, 100, 100, 100 ]});
  }

  

  AddFeatures(){
    this.features=[];
    if (this.service.posts.length==0){
      return;
    }
    for(const post of this.service.posts){
      this.features.push(new Feature({
        element: post,
        geometry:new Point(fromLonLat([post.address.longitude,post.address.latitude]))
      }));
    }
    this.vectorSource=new VectorSource();
    this.vectorSource.addFeatures(this.features)
    this.setVectorSource(this.vectorSource);
  }


}

