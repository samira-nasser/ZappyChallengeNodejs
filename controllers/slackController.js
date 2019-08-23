const {
  createEventAdapter
} = require('@slack/events-api');

// const slackEvents = createEventAdapter('bcf78bb22ac90c08e57080c1e40c6aa');

const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET);
const {
  EventEmitter
} = require('events');

const emitter = new EventEmitter();

slackEvents.on('message', (event) => {
  const message = event.text.toLocaleLowerCase();
  if (message.split(' ').some(w => w === 'go')) {
    emitter.emit('slackMessage');
    console.log('Message includes word go!');
  }
  console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${message}`);
});

slackEvents.on('error', (err) => {
  console.log(err);
});

module.exports = {
  slackEvents,
  emitter
};
