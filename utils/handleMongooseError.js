const handleMongooseError = (error, data, next) => {
  const { name, code } = error;

  if (name === "MongoWriteConcernError" && code === 79) {
    error.status = 409;
  } else error.status = 400;

  next();
};
module.exports = handleMongooseError;
