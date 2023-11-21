const handleMongooseError = (err, data, next) => {
  err.status = 400;
  next();
};

export default handleMongooseError;
