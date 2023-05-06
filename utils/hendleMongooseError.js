const hendleMongooseError = (err, data, next) => {
  err.status = 400;
  next();
};

module.exports = hendleMongooseError;