const { ValidationError, WrongParametersError } = require("../helpers/errors");

const asyncWrapper = (controller) => {
  return (req, res, next) => {
    controller(req, res).catch(next);
  };
};
const errorHandler = (error, req, res, next) => {
  if (
    error instanceof ValidationError ||
    error instanceof WrongParametersError
  ) {
    return res.status(error.status).json({ message: error.message });
  }
  return res.status(500).json({ message: error.message });
};
module.exports = { asyncWrapper, errorHandler };
