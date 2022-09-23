const handleMongooseSchemaError = (error, data, next) => {
  const { name, code } = error;
  const isDublicate = name === "MongoServerError" && code === 11000;
  error.status = isDublicate ? 409 : 400;
  next();
};

module.exports = handleMongooseSchemaError;
