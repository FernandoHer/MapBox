import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface ColorMarker {
  color: string,
  marker?: mapboxgl.Marker,
  center?: [number,number]
}


@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
    .mapa-container {
      height: 100%;
      weight: 100%
    }

    .list-group {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 999;
    }

    li{
      cursor: pointer;
    }
    `
  ]
})
export class MarcadoresComponent implements AfterViewInit {

  @ViewChild('zoomMapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLabel: number = 15;
  center :[number, number]=[-78.49371903929712, -0.14114903062663503];
  markers: ColorMarker[] = [];


  constructor() { }


  ngAfterViewInit(): void {
      
      this.mapa = new mapboxgl.Map({
          container: this.divMapa.nativeElement,
          style: 'mapbox://styles/mapbox/streets-v11',
          center:this.center,
          zoom: this.zoomLabel
      });

      const markerHtml: HTMLElement = document.createElement('div');
      markerHtml.innerHTML = 'Aqui estoy';

      this.readMarkerLocalStorage();


      // para poder poner una foto o texto en vez del marcador
      // const maker = new mapboxgl.Marker(
      //   element: markerHtml
      // )
      //   .setLngLat(this.center)
      //   .addTo(this.mapa);
  }

  addMarker(){

    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const newMarker = new mapboxgl.Marker({
      draggable: true,
      color
    }
    )
        .setLngLat(this.center)
        .addTo(this.mapa);

    this.markers.push({
      color,
      marker: newMarker
    });

    this.saveMarkerLocalStorage();

    newMarker.on('dragend', () => {
      this.saveMarkerLocalStorage();
    });

  }

  eraseMarker( i: number){

    this.markers[i].marker?.remove();
    this.markers.splice(i , 1);
    this.saveMarkerLocalStorage();

  }
  

  goMarker(marker:ColorMarker){

      this.mapa.flyTo({
      center : marker.marker?.getLngLat(),
      zoom : 18
    })

  };

  saveMarkerLocalStorage(){

    const lnglatArr: ColorMarker[] = [];
    
    this.markers.forEach( m => {
        const color = m.color;
        const {lng, lat} = m.marker!.getLngLat();

        lnglatArr.push({
          color: color,
          center: [lng, lat]
        });
    });
    localStorage.setItem('marcadores', JSON.stringify(lnglatArr))
  

  };

  readMarkerLocalStorage(){
    if( !localStorage.getItem('marcadores')){
      return;
    };

    const lngLatArr: ColorMarker[] = JSON.parse(localStorage.getItem('marcadores')!);

    lngLatArr.forEach( m=> {
      const newMarker = new mapboxgl.Marker ({
        color: m.color,
        draggable: true
      })
      .setLngLat(m.center!)
      .addTo(this.mapa);

      this.markers.push({
        marker: newMarker,
        color:m.color
      });

      newMarker.on('dragend', () => {
        this.saveMarkerLocalStorage();
      });
    });


  };


}
