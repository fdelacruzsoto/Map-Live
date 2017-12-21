export const config_db = {
  name: process.env.DB || 'live-map',
  servers: (process.env.DB_SERVERS) ? process.env.DB_SERVERS.split(' ') : [
    'database'
  ] 
};