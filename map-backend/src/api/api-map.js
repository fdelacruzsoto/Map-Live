import * as status  from 'http-status';
import http             from 'http';
import { EventEmitter } from 'events';
import * as controller  from '../controllers/controller.map';
import config_server    from '../configurations/config.server';
const io = require('socket.io')(process.env.SOCKET_PORT || 3001);
const mediator = new EventEmitter();

const socket = io.on('connection', sock => {
  sock.emit('connected', {
    connected: 'yes!'
  });
  sock.on('client', data => {
    console.log('Client connected: ' + data.connected);
  });
});

mediator.on('updateList', () => {
  console.log('List updated'); 
  controller.get_all()
    .then(places => {
      socket.emit('list', {
        places: places
      });
    }).catch((error) => {
      socket.emit('list', {
        message: 'It was not possible to return the list of places.'
      });
    }); 
});

export const init = (app) => {

  app.get("/", (req, res) => res.json({message: "Welcome!"}));

  app.post('/place', (req, res, next) => {
    controller.create_place(req)
      .then(data => {
        console.log(data);
        mediator.emit('updateList');
        res.status(status.OK).json({
          result: 'Place created'
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(status.INTERNAL_SERVER_ERROR).json({
          result: 'Error while creating a new place.'
        });
      });
  });

  app.get('/place', (req, res, next) => {
    controller.get_all()
      .then(places => {
        console.log(places);
        mediator.emit('updateList');
        res.status(status.OK).json({
          result: places
        }); 
      }).catch((error) => {
        console.log(error);
        res.status(status.INTERNAL_SERVER_ERROR).json({
          result: 'There was an error'
        });
      });
  });

  app.put('/place', (req, res, next) => {
    controller.update_place(req)
    .then(result => {
      console.log(result);
      mediator.emit('updateList');
      res.status(status.OK).json({
        result: result
      });
    }).catch((error) => {
      console.log(error);
      res.status(status.INTERNAL_SERVER_ERROR).json({
        result: 'It was not possible to update the place.'
      });
    });
  });

  app.delete('/place', (req, res, next) => {
    controller.delete_place(req)
      .then(result => {
        console.log(result);
        mediator.emit('updateList');
        res.status(status.OK).json({
          result: result
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(status.INTERNAL_SERVER_ERROR).json({
          result: 'It was not possible to delete the place.'
        });
      });
  });

}
