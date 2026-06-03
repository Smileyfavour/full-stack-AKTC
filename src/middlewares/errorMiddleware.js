const { sendError } = require('../utils/responseHandler');
const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  logger.error(err.stack);
  if (err.name === 'ValidationError') {
    return sendError(res, err.message, 400, err.errors);
  }
  if (err.code === 11000) {
    return sendError(res, 'Duplicate field value entered', 400);
  }
  sendError(res, err.message || 'Internal Server Error', err.status || 500);
};

module.exports = errorHandler;