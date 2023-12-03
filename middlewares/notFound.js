// /middleware/notFound.js
const notFoundMiddleware = (req, res, next) => {
  const error = new Error("Resource not found");
  error.status = 404;
  next(error);
};

module.exports = notFoundMiddleware;
