'use strict';

const status = require('http-status');
let place_controller = require('../controller/controller-place');

module.exports = (app) => {

  app.get('/', (req, res, next) => {
    res.status(status.OK).json({message: 'ok'});
  });

  app.post('/place', (req, res, next) => {
    console.log(req.body);
    
    place_controller.create_place(req).then((data) => {
      console.log(data);
      res.status(status.OK).json({result: 'Place created'});
    }).catch((error) => {
      console.log(error);
      res.status(status.error).json({result: 'Error while creating a new place created'});
    });
  });

  app.get('/place', (req, res, next) => {
    
  });

  app.put('/place', (req, res, next) => {
        
  });

  app.delete('/place', (req, res, next) => {
            
  });

};