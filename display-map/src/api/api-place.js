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
      res.status(status.CREATED).json({result: 'Place created'});
    }).catch((error) => {
      console.log(error);
      res.status(status.error).json({result: 'Error while creating a new place created'});
    });
  });

  app.get('/place', (req, res, next) => {
    place_controller.get_all()
      .then((places) => {
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
        res.status(status.ACCEPTED).json({result: 'Place updated.'});
      }).catch((error) => {
        console.log(error);
        res.status(status.NOT_MODIFIED).json({result: 'It was not possible to update the place.'});
      });
  });

  app.delete('/place', (req, res, next) => {
            
  });

};