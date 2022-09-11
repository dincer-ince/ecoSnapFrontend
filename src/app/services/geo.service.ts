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
import DragAndDrop from 'ol/interaction/DragAndDrop';
//import GeoJSON from 'ol/format/GeoJSON';
import { fromLonLat } from 'ol/proj';
import { defaults as defaultControls } from 'ol/control';
import { defaults as defaultInteractions, PinchZoom } from 'ol/interaction';
import { Injectable } from '@angular/core';
import { Collection, Feature } from 'ol';
import { Geometry } from 'ol/geom';

export interface Vector {
  readonly name: string;
  readonly source: VectorSource;
}
@Injectable()
export class GeoService {

  tileSources = [
    { name: 'None', source: null },
    { name: 'OSM', source: new OsmSource() },
    { name: 'Stamen', source: new StamenSource({ layer: 'toner' }) }
  ];

  selectedTileSource = this.tileSources[1];
  vectorSources: Vector[] = [];

  public readonly map: Map;
  private readonly tileLayer: TileLayer<OsmSource>;
  private readonly vectorLayer: VectorLayer<any>;
  private readonly extent = [3611650.626394008, 4827814.081135093, 3677539.34477583, 4874937.5090729045];

  constructor() {

    this.tileLayer = new TileLayer();
    this.vectorLayer = new VectorLayer<any>();

    this.map = new Map({
      interactions: defaultInteractions().extend([
        new PinchZoom()
      ]),
      layers: [
        this.tileLayer
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
    this.map.setTarget('');
    this.map.setTarget(target);
    this.map.updateSize();
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
  setVectorSource(source: Vector): void {
    this.vectorLayer.setSource(source.source);
    this.map.getView().fit(this.vectorLayer.getSource().getExtent());
  }
}

