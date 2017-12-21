import morgan           from 'morgan';
import bodyParser       from 'body-parser';

export const init = (app, config_server) => {
  // Allow cross origin connection
  app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  // Configure logging and body parser
  app.use(morgan(config_server.morgan));
  //console.log('Logging level: ' + config_server.morgan);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended:true }));
}