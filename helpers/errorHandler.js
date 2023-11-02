module.exports = (err, req, res, next) => {
  const statusCode = err.status || res.code || 500;
  const { message = 'Server error' } = err;
  const errorName = err.name || 'unknown error';
  res.status(statusCode).json({ code: statusCode, errorName, message });
};
