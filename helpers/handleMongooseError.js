const handleMongooseError = (error, data, next) => {
  // mongoose error consists of its name & code
  const { name, code } = error;

  // We get name is "MongoServerError" & code 11000 if validating field isn't unique
  // In all other error cases name is "ValidationError" & code "undefined"
  const status = name === "MongoServerError" && code === 11000 ? 409 : 400;

  error.status = status;

  next();
};

module.exports = handleMongooseError;
