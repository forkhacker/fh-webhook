/*
 * Rabbitmq service
 */

const _ = require('lodash');
const Promise = require('bluebird');
const config = require('config');
const amqplib = require('amqplib');
const logger = require('log4js').getLogger('rabbitmq');

module.exports = () => {
  let subConn;
  let pubConn;
  let exchangeName;
  let queues;
  let exchangeType;
  let exchangeOptions = {
    durable: true,
  };
  let pubChannel;

  /**
   * publishes a message to the target exchange
   */
  const publish = async function (_exchangeName, key, payload, props = {}) {
    try {
      props.contentType = 'application/json';
      pubChannel.publish(_exchangeName, key, new Buffer(JSON.stringify(payload)), props);
    } catch (err) {
      logger.error(err);
    }
  };

  /**
   * Initializes a publisher connection
   */
  const initPublisher = async function (options) {
    try {
      logger.info('Initializing publisher(s) ...');
      pubConn = await amqplib.connect(options.url);
      exchangeName = options.exchangeName;
      exchangeType = options.exchangeType || 'topic';
      exchangeOptions = options.exchangeOptions || exchangeOptions;
      queues = options.queues;
      pubChannel = await pubConn.createChannel();
      await pubChannel.assertExchange(exchangeName, exchangeType, exchangeOptions);
      _.each(queues, async function (queue) {
        await pubChannel.assertQueue(queue.name);
        await pubChannel.bindQueue(queue.name, exchangeName, queue.key);
      });
    } catch (err) {
      logger.error(err);
      return Promise.reject(err);
    }
  };

  return {
    initPublisher,
    publish,
  };
};
