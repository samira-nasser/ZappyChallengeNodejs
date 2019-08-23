/**
 * Module dependencies.
 */
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const logger = require('morgan');
// const chalk = require('chalk');
const errorHandler = require('errorhandler');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({
  path: '.env'
});


/**
 * Create Express server.
 */
const app = express();

/**
 * Connect to MongoDB.
 */
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.connect('mongodb://localhost:27017/test');
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});

/*
 * Slack configuration.
 */
const slack = require('./controllers/slackController');

app.use('/slack/events', slack.slackEvents.expressMiddleware());

/*
 * Twitter init.
 */
require('./controllers/twitterController');


/**
 * Express configuration.
 */

// app.use(morgan("short"));

app.set('host', '0.0.0.0');
app.set('port',8000);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.disable('x-powered-by');

/*
 * Models
 */
const {
  Tweets
} = require('./models/Tweets');

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

/**
 * Routes .
 */
app.get('/', async (req, res) => {
  try {
    const tweets = await Tweets.find({}).exec();
    res.json(tweets);
  } catch (error) {
    res.json(error);
  }
});

app.post('/slack/events', (req, res) => {
  res.json(req.body.challenge);
});

/**
 * Error Handler.
 */

 // in case more than environment like .. testing , staging , VM , development
if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorHandler());
} else {
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Error in server',err);
  });
}

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('I`m listening ...... at http://localhost:%d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;
