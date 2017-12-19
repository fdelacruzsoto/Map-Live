import mongoose from 'mongoose';
const Schema = mongoose.Schema;

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

export default mongoose.model('Place', PlaceSchema);