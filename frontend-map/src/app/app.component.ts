import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  socket = io('http://localhost:3001');
  title = 'Live Update on map';
  you = 'you';
  lat = 20.6500182;
  lng = -103.4041403;
  zoom = 15;
  markers: Marker[] = [];

  ngOnInit() {

    this.socket.on('connected', function (data) {
      console.log('Server connected: ' + data.connected);
      this.socket.emit('client', { connected: true });
    }.bind(this));

    this.socket.on('list', function (data) {
      this.markers = [];
      for (const place of data.places) {
        this.markers.push({
          id: place._id,
          name: place.name,
          lat: place.lat,
          lng: place.long,
          open: place.open
        });
      }
    }.bind(this));

  }
}

interface Marker {
  id: string;
  name: string;
  lat: number;
  lng: number;
  open: boolean;
}
