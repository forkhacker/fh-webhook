const logger = require('log4js').getLogger('listeners')
module.exports = {
  init: (github) => {
    logger.info('Initializing Listesners')
    github.on('pull_request', (event, data) => {
    });

    github.on('fork', (event, data) => {
    });
    github.on('*', (event, data) => {
      console.log(9, event,data);
    });
  },
};
