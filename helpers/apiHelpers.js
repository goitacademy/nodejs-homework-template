const {
  ValidationError,
  WrongIdError,
  DuplicationEmailError,
  UnauthorizedError,
} = require("./errors");

const asyncWrapper = (controller) => {
  return (req, res, next) => {
    controller(req, res).catch(next);
  };
};

const errorHandler = (error, req, res, next) => {
  if (
    error instanceof ValidationError ||
    error instanceof WrongIdError ||
    error instanceof DuplicationEmailError ||
    error instanceof UnauthorizedError
  ) {
    return res.status(error.status).json({ message: error.message });
  }
  res.status(500).json({ message: error.message });
};

module.exports = { asyncWrapper, errorHandler };
