const { SUCCESS_STATUS } = require('../../data/resStatuses.json');
const { SUCCESS_LOG } = require('../../data/logs.json');
const log4js = require('log4js');
const logger = log4js.getLogger();

const successResponce = (
  message = SUCCESS_LOG.DEFAULT,
  data,
  status = SUCCESS_STATUS.DEFAULT
) => {
  let response = {
    status,
    message,
  };
  if (data) {
    response.data = data;
  }

  logger.info(message);
  return  response;
};

module.exports = successResponce;
