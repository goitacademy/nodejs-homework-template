const isError = ({ name, code }) =>
  name === "MongoServerError" && code === 11000;

const handleSaveErrors = (error, data, next) => {
  error.status = isError(error) ? 409 : 400;
  next();
};

module.exports = handleSaveErrors;
