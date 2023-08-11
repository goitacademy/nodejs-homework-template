const handleMongooseError = (error, data, next) => {
  error.status = 400;
  next(error)
};

export default handleMongooseError;