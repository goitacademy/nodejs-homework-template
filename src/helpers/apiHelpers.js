const errorHandlerNotFound = (req, res) => {
  res.status(404).json({ message: "Not found" });
};

const errorHandlerServerError = (err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
};

module.exports = {
  // asyncWrapper,
  errorHandlerNotFound,
  errorHandlerServerError,
};
