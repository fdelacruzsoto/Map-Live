'use strict';

let mongoose = require('mongoose');
let Place = mongoose.model('Place');

exports.create_place = (req) => {
  return new Promise((resolve, reject) => {
    let new_place = new Place(req.body);
    if(new_place.save()){
      resolve('User created');
    } else {
      reject('There was an error');
    }
  });
}