/*
 * contains constant values
 */

module.exports = {
  // The event types to be consumed from the source RabbitMQ
  events: {
    challengeForked: 'challenge.forked',
    challengePullRequest: 'challenge.pull.request',
  },
};
