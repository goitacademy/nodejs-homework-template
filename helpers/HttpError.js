const HttpError = (status, message) => {
  const error = new Error(message);
  return error;
};

module.exports = { HttpError };