const handleMongooseError = (error, _, next) => {
    error.status = 400;
    next(error);
  };
  
module.exports = handleMongooseError;