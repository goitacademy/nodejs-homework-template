const errorHandler = (error, req, res, next) => {
  console.log(res.statusCode);

  const statusCode = res.statusCode || 500;

  const stack = process.env.NODE_ENV === "production" ? null : error.stack;

  res.status(statusCode);

  res.json({ code: statusCode, stack });
};

module.exports = errorHandler;
