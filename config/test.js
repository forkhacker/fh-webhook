module.exports = {
  RABBITMQ: {
    URL: 'amqp://localhost:5672',
    EXCHANGE_NAME: 'webhooks-test',
    FORK_QUEUE_NAME: 'fork-test',
    PULL_QUEUE_NAME: 'pull-test',
  },
};
