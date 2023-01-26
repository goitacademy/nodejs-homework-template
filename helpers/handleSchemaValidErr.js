const conflictErrorHelper = require("./conflictErrorHelper");

const isConflict = ({ name, code }) => {
  return name === "MongoServerError" && code === 11000;
};

const handleErrors = (error, data, next) => {
  error.status = isConflict(error) ? 409 : 400;
  if (error.status === 409) {
    conflictErrorHelper(error);
  }
  next();
};

module.exports = handleErrors;
