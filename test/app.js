'use strict';
const request = require('supertest');
const app = require('../app.js');

describe('GET /', () => {
  it('should return the status of successful request like this 200 OK', (done) => {
    request(app)
      .get('/')
      .expect(200);
    done();
  });
});