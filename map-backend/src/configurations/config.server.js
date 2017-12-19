export const config_server = {
  port: process.env.PORT || 3000,
  env: process.env.ENV || 'dev',
  morgan: process.env.MORGAN || 'dev'
};