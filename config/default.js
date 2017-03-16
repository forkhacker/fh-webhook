module.exports = {
  RABBITMQ: {
    URL: 'amqp://localhost:5672',
    EXCHANGE_NAME: 'webhooks',
    FORK_QUEUE_NAME: 'fork',
    PULL_QUEUE_NAME: 'pull',
  },
};
