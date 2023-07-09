module.exports = (error, req, res, next) => {
  const statusCode = error.status || 500;
  res.status(statusCode);
  res.json({ code: statusCode, stack: error.stack, message: error.message });
};
