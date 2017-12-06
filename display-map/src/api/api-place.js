'use strict';

const status = require('http-status');
const config = require('../config/config');
const place_controller = require('../controller/controller-place');
const http = require('http');

module.exports = (app) => {

  const server = http.Server(app);
  server.listen(config.server.socket); 
  const io = require('socket.io')(server); // Warning! This shouldn't be done, I couldn't find a way to don't use require here, I'll come back later

  const socket = io.on('connection', sock => {
    sock.emit('connected', { connected: 'yes!' });
    sock.on('client', data => {
      console.log('Client connected: ' + data.connected);
      place_controller.get_all()
      .then(places => {
        sock.emit('list',{places: places});
      }).catch((error) => {
        sock.emit('list',{message: 'It was not possible to return the list of places.'});
      });
    });
  });

  app.get('/', (req, res, next) => {
    res.status(status.OK).json({message: 'ok'});
  });

  app.post('/place', (req, res, next) => {
    place_controller.create_place(req)
      .then(data => {
        console.log(data);
        socket.emit('new',{place: data});
        res.status(status.CREATED).json({result: 'Place created'});
      }).catch((error) => {
        console.log(error);
        res.status(status.FORBIDDEN).json({result: 'Error while creating a new place created'});
      });
  });

  app.get('/place', (req, res, next) => {
    place_controller.get_all()
      .then(places => {
        console.log(places);
        socket.emit('list',{places: places});
        res.status(status.OK).json({places: places});
      }).catch((error) => {
        console.log(error);
        res.status(status.NOT_FOUND).json({result: 'It was not possible to return the list of places.'});
      });
  });

  app.put('/place', (req, res, next) => {
    place_controller.update_place(req)
      .then(result => {
        console.log(result);
        socket.emit('update',{place: result});
        res.status(status.ACCEPTED).json({result: result});
      }).catch((error) => {
        console.log(error);
        res.status(status.NOT_MODIFIED).json({result: 'It was not possible to update the place.'});
      });
  });

  app.delete('/place', (req, res, next) => {
    place_controller.delete_place(req)
      .then(result => {
        console.log(result);
        socket.emit('delete',{place: req.body.id});
        res.status(status.OK).json({result: result});
      })
      .catch((error) => {
        console.log(error);
        res.status(status.NOT_MODIFIED).json({result: 'It was not possible to update the place.'});
      });
  });

};