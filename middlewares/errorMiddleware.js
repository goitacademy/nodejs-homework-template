const errorHandler = (error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
      status: error.status,
      message: error.message,
      stack: error.stack
  });
  console.log('Error status: ', error.status);
  console.log('Message: ', error.message);
  next();
}

module.exports = {
  errorHandler
}