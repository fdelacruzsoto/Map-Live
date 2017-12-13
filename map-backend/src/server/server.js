'use strict';

const app = require('express')();
const bodyParser = require('body-parser');
const morgan = require('morgan');
let place = require('../model/model-place');
const place_api = require('../api/api-place');

/**
 * Start the API server and allow cors
 * @param {port} 
 */
const start = (options) => {
  return new Promise((resolve, reject) => {
    if(!options.port){
      reject(new Error('The server must be started with a valid port.'));
    }
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(morgan('dev'));
    app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "http://localhost:4200");
      res.header('Access-Control-Allow-Credentials', true);
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
    app.use((err, req, res, next) => {
      reject(new Error('Something went wrong. Error: ' + err));
      res.status(500).send('Something went wrong!');
    });
    place_api(app);
    const server = app.listen(options.port, () => resolve(server));
  });
};

module.exports = Object.assign({}, {start});