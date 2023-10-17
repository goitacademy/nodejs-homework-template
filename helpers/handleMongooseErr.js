const handleMongooseErr = (error, doc, next) => {
  if (error) {
    console.error('Mongoose Error:', error.message);
    next(error);
  } else {
    next();
  }
};

module.exports = {
  handleMongooseErr,
};
