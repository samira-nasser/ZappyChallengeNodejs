const Twit = require('twit');
const tweets = require('../models/Tweets').Tweets;
const slack = require('./slackController').emitter;

const twitterClient = new Twit({
  consumer_key: process.env.TWITTER_KEY,
  consumer_secret: process.env.TWITTER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000,
  strictSSL: true,
});

// eslint-disable-next-line camelcase
const user_id = process.env.TWITTER_USER_ID;

slack.on('slackMessage', () => {
  twitterClient.get('statuses/user_timeline', {
    user_id,
  }).then((result) => {
    tweets.saveTweets(result.data);
  }).catch(err => console.log(err));
});

module.exports = {
  twitterClient
};
