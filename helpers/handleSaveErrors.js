const handleSaveErrors = (error, data, next) => {
  const { name, code } = error;
  error.status = name === "MongoServerErrror" && code === 11000 ? 409 : 400;
  next();
};

module.exports = handleSaveErrors;
