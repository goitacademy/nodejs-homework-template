const ErrorHandler = (err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ statusCode: status, message });
};

module.exports = ErrorHandler;