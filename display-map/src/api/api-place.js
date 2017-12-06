'use strict';

const status = require('http-status');
const config = require('../config/config');
const place_controller = require('../controller/controller-place');
const http = require('http');

module.exports = (app) => {

  const server = http.Server(app);
  server.listen(config.server.socket); 
  const io = require('socket.io')(server); // Warning! This shouldn't be done, I couldn't find a way to don't use require here, I'll come back later

  io.on('connection', socket => {
    socket.emit('connected', { connected: 'yes!' });
    socket.on('client', data => {
      console.log('Client connected: ' + data.connected);
    });
  });

  app.get('/', (req, res, next) => {
    res.status(status.OK).json({message: 'ok'});
  });

  app.post('/place', (req, res, next) => {
    place_controller.create_place(req)
      .then(data => {
        console.log(data);
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
        res.status(status.OK).json({result: result});
      })
      .catch((error) => {
        console.log(error);
        res.status(status.NOT_MODIFIED).json({result: 'It was not possible to update the place.'});
      });
  });

};