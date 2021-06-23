const { CustomError } = require('./errors');
const { httpCode } = require('./constants');
const asyncWrapper = controller => {
  return (req, res, next) => {
    controller(req, res).catch(next);
  };
};

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.status).json({
      message: err.message,
    });
  }
  res.status(httpCode.INTERNAL_SERVER_ERROR).json({ message: err.message });
};

module.exports = { asyncWrapper, errorHandler };
