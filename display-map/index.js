let app = require('express')();
let server = require('http').Server(app);
let io = require('socket.io')(server);

server.listen(8000);

process.on('uncaughtException', (err) => {
  console.error('Unhandled Exception', err);
});
process.on('uncaughtRejection', (err, promise) => {
  console.error('Unhandled Rejection', err);
});

io.on('connection', function (socket) {
  socket.emit('connected', { connected: true });
  socket.on('client', function (data) {
    console.log('Client connected: ' + data.connected);
  });
});