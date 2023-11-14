const notFoundMiddleware = (req, res, next) => {
  const error = new Error(
    'Resource not found plis insert http://localhost:3000/api/Contacts',
  );
  error.status = 404;
  next(error);
};

module.exports = { notFoundMiddleware };
