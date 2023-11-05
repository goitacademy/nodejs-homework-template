const errorHandlerMiddleware = (err, _, res, __) => {
  res.status(err.status || 500).json({
    error: {
      message: err.message,
    },
  });
};

module.exports = errorHandlerMiddleware;
