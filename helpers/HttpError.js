const HttpError = (status, massage) => {
  const error = new Error(massage);
  error.status = status;
  return error;
};

module.exports = HttpError;
