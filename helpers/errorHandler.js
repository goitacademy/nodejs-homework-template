module.exports = (err, req, res, next) => {
  const statusCode = err.status || res.code || 500;
  const { message = 'Server error' } = err;
  res.status(statusCode).json({ code: statusCode, message });
};
