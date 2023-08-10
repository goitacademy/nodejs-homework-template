const handleMongooseError = (error, _, next) => {

  const { name, code } = error;
  
  const status = name === "MongoServerError" && code === 11000 ? 409 : 400;
  error.status = status;
};

module.exports = handleMongooseError;