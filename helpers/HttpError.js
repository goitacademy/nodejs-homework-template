const HttpError = (code, message) => {
  const error = new Error(message);
  error.status = code;
  return error;
};
module.exports = HttpError;
