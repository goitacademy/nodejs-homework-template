  const errorHandlerServerError = (err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
};

module.exports = errorHandlerServerError;
