import mongoose   from 'mongoose';
import * as place from '../src/data/model/model.place';
import chai       from 'chai';
import chaiHttp   from 'chai-http';
import app        from '../src/index';

const should = chai.should();
chai.use(chaiHttp);

describe('Places', () => {

  describe('/GET place', () => {
    it('it should GET all the places', (done) => {
      chai.request(app)
          .get('/place')
          .end((err, res) => {
              res.should.have.status(200);
              done();
          });
    });
  });

  describe('/POST place', () => {
    it('it should POST a valid place', (done) => {
      let place = {
          name: "Plaza del angel",
          lat: "20.6544729",
          long: "-103.4065053",
          open: false
      }
      chai.request(app)
          .post('/place')
          .send(place)
          .end((err, res) => {
              res.should.have.status(200);
            done();
          });
    });
  });

});