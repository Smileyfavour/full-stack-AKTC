const { sendError } = require('../utils/responseHandler');
const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {

  // jwt errors
    if (err.name === "TokenExpiredError") {
    return sendError(res, "Token expired, please login again", 401);
  }

  if (err.name === "JsonWebTokenError") {
    return sendError(res, "Invalid token", 401);
  }

  // mongoose validation error
  logger.error(err.stack);
  if (err.name === 'ValidationError') {
    return sendError(res, err.message, 400, err.errors);
  }

  // duplicate key error
  if (err.code === 11000) {
    return sendError(res, 'Duplicate field value entered', 400);
  }

  // default fallback
  sendError(res, err.message || 'Internal Server Error', err.status || 500);
};



module.exports = errorHandler;