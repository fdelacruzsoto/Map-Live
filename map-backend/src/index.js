import express                    from 'express';
import path                       from 'path';
import bodyParser                 from 'body-parser';
import morgan                     from 'morgan';
import dotEnv, { config }         from 'dotenv';
import httpStatus                 from 'http-status';

import * as db                    from './helpers/helper.db';
import {config_db,  // Production DB
  config_dev_db,    // Development DB
  config_test_db}                 from './configurations/config.db';
import {config_server}            from './configurations/config.server';
import * as place                 from './data/model/model.place';
import * as placeAPI              from './api/api-map';

process.on('uncaughtException', (err) => {
  console.error('Unhandled Exception', err);
});
process.on('uncaughtRejection', (err, promise) => {
  console.error('Unhandled Rejection', err);
});

// Configure the environment 
dotEnv.config();

// Create the express app
const app = express();

// Allow cross origin connection
app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Configure logging and body parser
app.use(morgan(config_server.morgan));
console.log('Logging level: ' + config_server.morgan);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

// Connect to DB
db.connect(config_db);

console.log('Database level: ' + config_server.env);

app.get("/", (req, res) => res.json({message: "Welcome!"}));

placeAPI.init(app);

app.listen(config_server.port, () => {
  console.log(`App Server Listening at ${config_server.port}`);
});

export default app;