const HttpError = (status, messang) => {
  const error = new Error(messang);
  error.status = status;
  return error;
};
module.exports = HttpError;
