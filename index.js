const githubhook = require('githubhook');
const config = require('config');

const rabbitmq = require('./rabbitmq')();
const constants = require('./constants');
const listeners = require('./listeners');

const github = githubhook({
  secret: config.GITHUB.WEBHOOKSECRET,
  logger: require('log4js').getLogger('index/webhook'),
});

const mqOptions = {
  url: config.get('RABBITMQ.URL'),
  exchangeName: config.get('RABBITMQ.EXCHANGE_NAME'),
  exchangeOptions: {
    autoDelete: false,
    durable: true,
  },
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

rabbitmq.initPublisher(mqOptions)
.then(() => {
  github.listen();
  listeners.init(github);
})

module.exports = {
  github,
};
