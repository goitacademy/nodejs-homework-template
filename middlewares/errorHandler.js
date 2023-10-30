const errorHandlerMiddleware = (err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      message: err.message,
    },
  });
};

module.exports = errorHandlerMiddleware;
