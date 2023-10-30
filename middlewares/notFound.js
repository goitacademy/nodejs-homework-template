const notFoundMiddleware = (_, __, next) => {
  //res.status(404).json({ message: 'Not found' });
  const error = new Error('Resource not found');
  error.status = 404;
  next(error);
};

module.exports = notFoundMiddleware;
