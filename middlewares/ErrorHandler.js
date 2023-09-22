const ErrorHandler = (err, req, res, next) => {
  const { name, code, message = "Server error", status = 500 } = err;
  const  customStatus = (name === "MongoServerError" && code === 11000) ? 409 : status;
  res.status(customStatus).json({ statusCode: status, message });
};

module.exports = ErrorHandler;
