'use strict';
process.env.NODE_ENV = 'development';
// const chai = require('chai');
const { expect } = require('chai');
// const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
const sinon = require('sinon');
require('sinon-mongoose');

const {
  Tweets
} = require('../models/Tweets');

describe('Tweets Model test', () => {
  it('should create a new tweet , save it in mongoDB', (done) => {
    const TweetMock = sinon.mock(new Tweets({
      id_str: Math.floor(100000000 + Math.random() * 900000000).toString(),
      text: 'Test Tweet',
    }));
    const tweet = TweetMock.object;
    tweet.save((err) => {
      expect(err).to.be.null;
      done();
    });
  });

  it('should not create a tweet with the unique id_str', (done) => {
    const tweetMock = sinon.mock(new Tweets({ id_str: '55', text: 'random text' }));
    const tweet = tweetMock.object;
    tweet.save((err, result) => {
      expect(result).to.be.undefined;
      done();
    });
  });

  it('should get all tweets from the account', (done) => {
    const tweetMock = sinon.mock(Tweets);
    const tweet = tweetMock.object;
    tweet.find({}, (err, result) => {
      expect(result).to.not.be.undefined;
      done();
    });
  });
});
