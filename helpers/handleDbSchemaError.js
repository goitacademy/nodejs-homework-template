const errorStatus = ({ name, code }) =>
  code === 11000 && name === "MongoServerError";

const handleDbSchemaError = (error, data, next) => {
  error.status = errorStatus(error) ? 409 : 400;

  next();
};

module.exports = handleDbSchemaError;
