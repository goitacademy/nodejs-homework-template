const { BaseError } = require("./index");

const errorHandler = (err, req, res, next) => {
  if (err instanceof BaseError) {
    return res
      .status(err.statusCode)
      .json({ message: err.message, name: err.name });
  }
  return res.status(500).json({ message: err.message, name: err.name });
};

module.exports = errorHandler;
