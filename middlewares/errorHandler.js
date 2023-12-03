// /middleware/errorHandler.js
const errorHandlerMiddleware = (err, req, res, next) => {
  // console.error(err.stack);
  res.status(err.status || 500).json({
    result: null,
    message: err.message,
  });
};

module.exports = errorHandlerMiddleware;
