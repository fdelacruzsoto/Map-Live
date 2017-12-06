import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  socket = io('http://localhost:3001');

  ngOnInit() {
    this.socket.on('connected', function (data) {
      console.log('Server connected: ' + data.connected);
      this.socket.emit('client', { connected: true });
    }.bind(this));
  }
}
