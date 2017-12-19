import mongoose from 'mongoose';

const mongo_options = {
  useMongoClient: true
};

export const connect = (config) => {
  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://' + config.servers + '/' + config.name, mongo_options)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB: ' + error));
}