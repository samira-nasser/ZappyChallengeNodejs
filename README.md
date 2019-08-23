# ZappyChallenge!
 **Zappy** integrates with a **Slack** channel and listens on specific messages fetching **tweets** to mongodb.

 1. Installation
 2. .ENV FILE
 3. Slack Integration
 4. Twitter Integration

# Installation

To build the application you'll need docker and docker-composed installed:
[Install Docker](https://docs.docker.com/install/)

After installing docker build and run the application with the following commands:
```
docker-compose build web
docker-compose up web
``````

After successfully building and running the server, the terminal output should be like this:
![docker-compose up web](https://i.imgur.com/SQh9Biv.png)

## .ENV FILE

.env file should conatin the following data:

> BASE_URL=http://localhost:8080							
> MONGODB_URI=mongodb://localhost:27017/test
>
> TWITTER_KEY=
> TWITTER_SECRET=
> TWITTER_ACCESS_TOKEN=
> TWITTER_ACCESS_TOKEN_SECRET=
>  TWITTER_USER_ID=
>
> SLACK_TOKEN=
> SLACK_SIGNING_SECRET=

## Slack Integration

Using Slack's  [Events API](https://api.slack.com/events-api) and [@slack/events-api package](@slack/events-api) we are able to receive events when users post messages, create or modify channels, or add or change files..

> **Note:** [Create a slack app ](https://api.slack.com/apps/new) if you haven't already. On the **Basic Information** page, in the section for **App Credentials**, note the **Signing Secret**.
> and Select the  **Event Subscriptions**  feature, and enable it. Input a  **Request URL**.
![Enable Event API](https://github.com/slackapi/node-slack-events-api/raw/master/support/event-subscriptions.gif)
>
> In this page under **Subscribe to Workspace Events** add **message.channels** events.
>
>
> **request URL** slack use it to reach your server, if you are in development mode you could you [ngrok](https://ngrok.com/) to generate a request url.
> **NOTICE THAT:** you should add the uri **/slack/events** to the request url or change it from app.js file  
![ngrok](https://github.com/slackapi/node-slack-events-api/raw/master/support/ngrok.gif)


# Twitter Integration

Create a **twitter app** https://developer.twitter.com/en/apps
In this page you can create an app and manage existing app.
Click the app's **details** button, then the tap **Keys and tokens**
Add you token in the previously create **.env** file.

To get twittes from a specific account(user) you should add this **USER ID** to .env file.
to get the user id visit: https://twitter.com/settings/your_twitter_data
