const { WebClient } = require('@slack/web-api');

console.log('Getting started with Node Slack SDK');


// Create a new instance of the WebClient class with the token read from your environment variable
const web = new WebClient(process.env.SLACK_TOKEN);
// The current date
// const currentTime = new Date().toTimeString();

(async () => {
  // Use the `auth.test` method to find information about the installing user
  const res = await web.auth.test()

  // Use the `chat.postMessage` method to send a message from this app
  var resultSearch = await web.search.messages({
    channel: 'Marketing Team',
    query: 'go'

  });

  console.log(resultSearch.messages.matches);
})();
