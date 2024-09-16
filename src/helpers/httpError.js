const httpError = (sratus, message) => {
  const error = new Error(message);
  error.status = sratus;

  return error;
};

module.exports = httpError;
