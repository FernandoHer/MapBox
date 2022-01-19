import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'

@Component({
  selector: 'app-full-scren',
  templateUrl: './full-scren.component.html',
  styles: [
    `
    #mapa {
      height: 100%;
      weight: 100%
    }
    `
  ]
})
export class FullScrenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {


      var map = new mapboxgl.Map({
          container: 'mapa',
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [-78.49371903929712, -0.14114903062663503],
          zoom: 17
    });
  }

}
