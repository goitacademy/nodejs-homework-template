const globalErrorHandler = (err, req, res, next) => {
  res.status(500).json({
    message: err.message || "Something went wrong please try again later",
  });
};

module.exports = { globalErrorHandler };
