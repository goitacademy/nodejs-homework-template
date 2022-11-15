const isConflict = ({ name, code }) =>
  name === "MogoServerError" && code === 11000;

const handleSchemaValidationsErrors = (error, data, next) => {
  error.status = isConflict(error) ? 409 : 400;

  next();
};

module.exports = handleSchemaValidationsErrors;
