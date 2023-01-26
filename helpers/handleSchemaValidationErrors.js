const isConflict = ({ name, code }) =>
  name === "MongoServerError" && code === 11000;

const handleSchemaValidationErrors = (error, data, next) => {
  //   const { name, code } = error;

  //   if (name === "MongoServerError" && code === 11000) {
  //     error.status = 409;
  //   } else {
  //     error.status = 400;
  //   }
  error.status = isConflict(error) ? 409 : 400;
  next();
};

module.exports = handleSchemaValidationErrors;
