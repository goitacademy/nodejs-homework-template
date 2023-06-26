const HttpError = (status, messege) => {
  const error = new Error(messege);
  error.status = status;
  return error;
};

module.exports = HttpError;
