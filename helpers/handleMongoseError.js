const handleMongooseError = (error, body, next) => {
    error.status = 400;
    next();
  };
  
  module.exports = handleMongooseError;