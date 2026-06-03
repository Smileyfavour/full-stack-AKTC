const { sendError } = require('../utils/responseHandler');

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return sendError(res, `Role ${req.user.role} is not allowed to access this resource`, 403);
    }
    next();
  };
};

module.exports = { authorize };