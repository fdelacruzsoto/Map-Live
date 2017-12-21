import mongoose from 'mongoose';
const Place = mongoose.model('Place');

export function create_place(req) {
  return new Promise((resolve, reject) => {
    let new_place = new Place(req.body);
    new_place.save()
      .then(place =>{
        resolve(place);
      }).catch(error => {
        reject(error);
      });
  });
}

export function get_all() {
  return new Promise((resolve, reject) => {
    Place.find({})
      .exec()
      .then(places => {
        resolve(places);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function update_place(req) {
  return new Promise((resolve, reject) => {
    Place.findByIdAndUpdate(req.body.id, {open: req.body.open}, {new: true})
      .exec()
      .then( result => {
        //console.log(result);
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function delete_place(req) {
  return new Promise((resolve, reject) => {
    Place.findByIdAndRemove(req.body.id)
      .exec()
      .then(() => {
        resolve('Place deleted.');
      })
      .catch(error => {
        reject(error);
      });
  });
}