const MongooseError = (error, _, next) => {
  error.status = 400;
  next();
};

module.exports = MongooseError;
