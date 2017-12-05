'use strict';

const express = require('express');
const server = require('http').Server(express);
const bodyParser = require('body-parser');
const io = require('socket.io')(server);
const morgan = require('morgan');
let place = require('../model/model-place');
const place_api = require('../api/api-place');

/**
 * 
 * @param {port} options 
 * The port that is going to be used to run the app.
 * We'll be running the app with a promise.
 */
const start = (options) => {
  return new Promise((resolve, reject) => {
    if(!options.port){
      reject(new Error('The server must be started with a valid port.'));
    }
    const app = express();
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(morgan('dev'));
    app.use((err, req, res, next) => {
      reject(new Error('Something went wrong. Error: ' + err));
      res.status(500).send('Something went wrong!');
    });
    place_api(app);
    io.on('connection', function (socket) {
      socket.emit('news', { hello: 'world' });
      socket.on('my other event', function (data) {
        console.log(data);
      });
    });
    const server = app.listen(options.port, () => resolve(server));
  });
};

module.exports = Object.assign({}, {start});