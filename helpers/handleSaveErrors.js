const handleSaveErrors = (error, data, next) => {
  const { code, name } = error;
  error.status = code === 11000 && name === 'MongoServerError' ? 409 : 404;
  next();
};

module.exports = handleSaveErrors;
