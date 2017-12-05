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
 * The server will be running at port 8000
 */
const server = {
  port: process.env.PORT || 8000
};

module.exports = Object.assign({}, { database, server })
