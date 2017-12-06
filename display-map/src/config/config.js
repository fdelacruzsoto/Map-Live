/**
 * The database constant will take the DB name from a env variable
 * or from the predefined value in case there is not env value
 */
const database = {
  name: process.env.DB || 'live-map',
  servers: (process.env.DB_SERVERS) ? process.env.DB_SERVERS.split(' ') : [
    'localhost'
  ] 
};

/**
 * The server will be running at port 3000 by default
 * The server will be listening for web socket on 3001 by default
 */
const server = {
  port: process.env.PORT || 3000,
  socket: process.env.PORT || 3001
};

module.exports = Object.assign({}, { database, server })
