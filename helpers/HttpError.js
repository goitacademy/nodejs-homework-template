const HttpError = (status = 500, message) => {
  const error = new Error(message);
  error.status = status;

  return error;
};

export default HttpError;
