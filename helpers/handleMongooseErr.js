const handleMongooseErr = (err, doc, next) => {
  err.status = 400;
  next();
};

module.exports = handleMongooseErr;
