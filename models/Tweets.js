const mongoose = require('mongoose');
const {
  filterParams
} = require('../util/tweetsObj');

const tweetsSchema = new mongoose.Schema({
  created_at: {
    type: String
  },
  id_str: {
    type: String,
    unique: true
  },
  text: {
    type: String
  }
}, {
  timestamps: true
});

const Tweets = mongoose.model('Tweets', tweetsSchema);

/**
 * @function saveTweets saves new tweets to tweets collection
 * @param  {} tweetsObj
 */

Tweets.saveTweets = function (tweetsObj) {
  tweetsObj = filterParams(tweetsObj);
  this.insertMany(tweetsObj).then(() => console.log('Hooppa Tweets')).catch(err => console.log(err));
};

module.exports = {
  Tweets
};
