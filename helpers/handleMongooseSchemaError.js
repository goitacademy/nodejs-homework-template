const handleMongooseSchemaError = (error, data, next) => {
  const { name, code } = error;
  const isDublicate = name === 'MongoServerError' && code === 11000;
  error.status = isDublicate ? 409 : 400;
  if (error.status === 409) {
    error.message = 'This contact phone already exists';
  }
  next();
};

module.exports = handleMongooseSchemaError;
