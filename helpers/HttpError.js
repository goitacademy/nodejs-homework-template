const HttpError = (status, messsage) => {
  const error = new Error(messsage);
  error.status = status;
  return error;
};

module.exports = HttpError;
