const MongooseError = (err, doc, next) => {
  err.status = 400;
  next();
};

module.exports = MongooseError;