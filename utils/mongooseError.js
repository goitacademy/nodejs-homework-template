const mongooseError = (error, _, next) => {
  error.status = 400;
  next();
};

module.exports = mongooseError;
