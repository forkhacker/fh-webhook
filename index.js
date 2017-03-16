var githubhook = require('githubhook');
var github = githubhook({/* options */});
const config = require('config');
const rabbitmq = require('./rabbitmq');
const constants = require('./constants');

const mqOptions = {
  url: config.get('RABBITMQ.URL'),
  exchangeName: config.get('RABBITMQ.EXCHANGE_NAME'),
  exchangeOptions: {
    autoDelete: false,
    durable: true,
  queues: [{
    name: config.get('RABBITMQ.FORK_QUEUE_NAME'),
    key: constants.events.challengeForked,
  },
  {
    name: config.get('RABBITMQ.PULL_QUEUE_NAME'),
    key: constants.events.challengePullRequest,
  }
],
};

delayService.initPublisher(delayQueueOptions)
.then(() => {
  github.listen();
})
