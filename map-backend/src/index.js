import express                    from 'express';
import path                       from 'path';
import dotEnv, { config }         from 'dotenv';
import httpStatus                 from 'http-status';
import * as db                    from './helpers/helper.db';
import {config_db}                from './configurations/config.db';
import {config_server}            from './configurations/config.server';
import * as place                 from './data/model/model.place';
import * as placeAPI              from './api/api-map';
import * as placeHelper           from './helpers/helper.api';

process.on('uncaughtException', (err) => {
  console.error('Unhandled Exception', err);
});
process.on('uncaughtRejection', (err, promise) => {
  console.error('Unhandled Rejection', err);
});

// Configure the environment 
dotEnv.config();

// Connect to DB
db.connect(config_db);

// Create, configure and add routes to the express app
const app = express();
placeHelper.init(app, config_server);
placeAPI.init(app);

// Start listeting on the defined port
app.listen(config_server.port, () => {
  console.log(`App Server Listening at ${config_server.port}`);
});

export default app;