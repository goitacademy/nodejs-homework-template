const globalErrorHandler = (err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).send({ message });
};

module.exports = {
  globalErrorHandler,
};
