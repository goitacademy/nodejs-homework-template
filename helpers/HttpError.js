const HttpError = (status, obj) => {
  const error = new Error();
  error.status = status;
  error.error = { ...obj };
  return error;
};

module.exports = { HttpError };
