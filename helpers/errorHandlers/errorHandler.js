const { HTTP400Error, HTTP404Error } = require("./index");

const errorHandler = (err, req, res, next) => {
  if (err instanceof HTTP400Error || err instanceof HTTP404Error) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  return res.status(500).json({ message: err.message });
};

module.exports = errorHandler;
