'use strict';

const mongoose = require('mongoose');

/**
 * Configuration options for mongodb
 * Right now only useMongoClient is needed
 */
const mongo_options = {
  useMongoClient: true
};

/**
 * Connect to the db
 * @param {servers, name} options 
 * @param {*} mediator 
 */
const connect = (options, mediator) => {
  mediator.once('boot.ready', () => {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://'+ options.servers +'/'+ options.name, mongo_options)
      .then(() => {
        console.log('Mongo connected.');
        mediator.emit('db.ready');
      },
      err => {
        console.error(err);
        mediator.emit('db.error', err);
      });
  });
};

module.exports = Object.assign({}, {connect});