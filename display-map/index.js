'use stric';
const {EventEmitter} = require('events');
const server = require('./src/server/server');
const database = require('./src/utils/database-connection');
const config = require('./src/config/config');
const mediator = new EventEmitter();

process.on('uncaughtException', (err) => {
  console.error('Unhandled Exception', err);
});
process.on('uncaughtRejection', (err, promise) => {
  console.error('Unhandled Rejection', err);
});

process.on('uncaughtException', (err) => {
  console.error('Unhandled Exception', err);
});
process.on('uncaughtRejection', (err, promise) => {
  console.error('Unhandled Rejection', err);
});

mediator.on('db.ready', () => {
  return new Promise((resolve, reject) => {
    resolve(server.start({port: config.server.port}));
  }).then(app => {
    console.log('Server started on port: ' + config.server.port);
  }).catch(error => {
    console.log('Error starting server: ' + error);
  });
});

database.connect(config.database, mediator);

mediator.emit('boot.ready');