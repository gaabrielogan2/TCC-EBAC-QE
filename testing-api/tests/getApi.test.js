require('dotenv').config();
const request = require('supertest');
const assert = require('assert');
const chai = require('chai');
const chaiJsonSchema = require('chai-json-schema');
const { couponSchema } = require('./schemas');

chai.use(chaiJsonSchema);
const expect = chai.expect;

const baseURL = 'http://lojaebac.ebaconline.art.br/wp-json/wc/v3';
const auth = `Basic ${process.env.ACCESS_TOKEN}`;

describe('Coupons API', function() {
  
  it('Should list all registered coupons', function(done) {
    request(baseURL)
      .get('/coupons')
      .set('Authorization', auth)
      .expect(200)
      .expect(res => {
        assert(Array.isArray(res.body));
        res.body.forEach(coupon => {
          expect(coupon).to.be.jsonSchema(couponSchema);
        });
      })
      .end(done);
  });

  it('Should list a specific coupon by ID', function(done) {
    const couponId = 4739;
    request(baseURL)
      .get(`/coupons/${couponId}`)
      .set('Authorization', auth)
      .expect(200)
      .expect(res => {
        assert.equal(res.body.id, couponId);
        assert(typeof res.body === 'object');
        expect(res.body).to.be.jsonSchema(couponSchema);
      })
      .end(done);
  });
});
