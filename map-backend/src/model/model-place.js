'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * A very simple schema
 */
const PlaceSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  lat: {
    type: Number,
    required: true
  },
  long: {
    type: Number,
    required: true
  },
  open: {
    type: Boolean
  }
});

module.exports = mongoose.model('Place', PlaceSchema);