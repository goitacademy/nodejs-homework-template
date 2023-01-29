const handleSchemaValidErrors = 

 (error, req, res, next) => {
  const statusCode = res.statusCode || 500;
  const serverMode =
    process.env.NODE_ENV === "development" ? error.stack : null;

  res.status(statusCode).json({ code: statusCode, message: serverMode });
  next();
};

module.exports = handleSchemaValidErrors;