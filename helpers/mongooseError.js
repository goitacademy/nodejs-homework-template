const mongooseError = (err, __, next) => {
  err.status(400);
  next();
};
module.exports = mongooseError;
