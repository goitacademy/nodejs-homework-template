const { ParentsValidationError } = require("./errors");

const asyncWrapper = (contrller) => {
  return (req, res, next) => {
    contrller(req, res).catch(next);
  };
};

const errorHandler = (error, req, res, next) => {
  if (error instanceof ParentsValidationError) {
    return res.status(error.status).json({ message: error.message });
  }
  console.log(error);
  res.status(500).json({ message: error.message });
};

module.exports = { asyncWrapper, errorHandler };
