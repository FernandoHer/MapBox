import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
    .mapa-container {
      height: 100%;
      weight: 100%
    }

    .row {
      background-color: white;
      border-radius: 5px;
      bottom: 50px;
      left:50px;
      padding: 10px;
      width: 400px;
      position: fixed;
      z-index: 999
    }
    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  constructor() { }

  ngOnDestroy(): void {
    this.mapa.off('zoom', () =>{});
    this.mapa.off('zoomend', () =>{});
    this.mapa.off('move', () =>{});

  }

  @ViewChild('zoomMapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLabel: number = 10;

  center :[number, number]=[-78.49371903929712, -0.14114903062663503];
  

  ngAfterViewInit(): void {
      
      this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center:this.center,
      zoom: this.zoomLabel
    });

      this.mapa.on('zoom', () =>{
            this.zoomLabel = this.mapa.getZoom() })

      this.mapa.on('zoomend', () =>{
        if(this.zoomLabel > 18 ){
          this.zoomLabel= 18
        } 
      });

      this.mapa.on('move', (event)=> {
        const target = event.target;
        const { lng, lat } = target.getCenter();
        this.center = [lng,lat];
      });

  }

  zoomIn(){
    this.mapa.zoomIn();

  }

  zoomOut(){
    this.mapa.zoomOut();

  }

  zoomCambio( valor:string ){
    this.mapa.zoomTo(Number(valor));

  }


}
