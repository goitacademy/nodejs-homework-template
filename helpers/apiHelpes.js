const { ValidationError, WrongPramError, WrongBodyError } = require("./errors");

const asyncWrapper = (contrller) => {
  return (req, res, next) => {
    contrller(req, res).catch(next);
  };
};

const errorHandler = (error, req, res, next) => {
  if (
    error instanceof ValidationError ||
    error instanceof WrongPramError ||
    error instanceof WrongBodyError
  ) {
    return res.status(error.status).json({ message: error.message });
  }
  console.log(error);
  res.status(500).json({ message: error.message });
};

module.exports = { asyncWrapper, errorHandler };
